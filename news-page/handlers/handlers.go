package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"html/template"
	"math"
	"net/http"
	"net/url"
	"os"
	"strconv"

	"github.com/matt-k8s/Learning/news-page/cache"
	"github.com/matt-k8s/Learning/news-page/news"
)

var tpl = template.Must(template.ParseFiles("./html/index.html"))

type Search struct {
	Query      string
	NextPage   int
	TotalPages int
	Results    *news.Results
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	buf := &bytes.Buffer{}
	err := tpl.Execute(buf, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	buf.WriteTo(w)
}

func SearchHandler(newsApi *news.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		u, err := url.Parse(r.URL.String())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		params := u.Query()
		searchQuery := params.Get("q")
		page := params.Get("page")
		if page == "" {
			page = "1"
		}

		// interact with cache
		redisHost := os.Getenv("REDIS_HOST")
		redisPort := os.Getenv("REDIS_PORT")
		newsCache := cache.NewCache(redisHost, redisPort)
		var ctx = context.Background()

		resultsForSearchQueryCached, err := newsCache.Exists(ctx, searchQuery).Result()
		if err != nil {
			return
		}

		if resultsForSearchQueryCached == 0 {
			results, err := newsApi.FetchEverything(searchQuery, page)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			resultsJson, err := json.Marshal(&results)
			if err != nil {
				return
			}

			// Set results for search query in the cache
			err = newsCache.Set(ctx, searchQuery, resultsJson, 0).Err()
			if err != nil {
				panic(err)
			}

			nextPage, err := strconv.Atoi(page)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			search := &Search{
				Query:      searchQuery,
				NextPage:   nextPage,
				TotalPages: int(math.Ceil(float64(results.TotalResults) / float64(newsApi.PageSize))),
				Results:    results,
			}

			buf := &bytes.Buffer{}
			err = tpl.Execute(buf, search)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			buf.WriteTo(w)
		} else {
			cachedResults, err := newsCache.Get(ctx, searchQuery).Result()
			if err != nil {
				panic(err)
			}

			cachedResultsData := &news.Results{}

			err = json.Unmarshal([]byte(cachedResults), &cachedResultsData)

			if err != nil {
				fmt.Println(err)
				return
			}

			nextPage, err := strconv.Atoi(page)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			search := &Search{
				Query:      searchQuery,
				NextPage:   nextPage,
				TotalPages: int(math.Ceil(float64(cachedResultsData.TotalResults) / float64(newsApi.PageSize))),
				Results:    cachedResultsData,
			}

			buf := &bytes.Buffer{}
			err = tpl.Execute(buf, search)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			buf.WriteTo(w)
		}
	}
}
