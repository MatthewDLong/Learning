package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"net/url"
	"os"

	"github.com/matt-k8s/Learning/go-giphy-search/cache"
	"github.com/matt-k8s/Learning/go-giphy-search/search"
)

var tpl = template.Must(template.ParseFiles("./html/index.html"))

type Search struct {
	Query   string
	Results *search.Results
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

func SearchHandler(giphyApi *search.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		u, err := url.Parse(r.URL.String())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		params := u.Query()
		searchQuery := params.Get("q")

		// Interact with cache
		redisHost := os.Getenv("REDIS_HOST")
		redisPort := os.Getenv("REDIS_PORT")
		giphyCache := cache.NewCache(redisHost, redisPort)
		var ctx = context.Background()

		resultsForSearchQueryCached, err := giphyCache.Exists(ctx, searchQuery).Result()
		if err != nil {
			return
		}

		if resultsForSearchQueryCached == 0 {
			results, err := giphyApi.Search(searchQuery)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			resultsJson, err := json.Marshal(&results)
			if err != nil {
				return
			}

			// Set results for search query in the cache
			err = giphyCache.Set(ctx, searchQuery, resultsJson, 0).Err()
			if err != nil {
				panic(err)
			}

			search := &Search{
				Query:   searchQuery,
				Results: results,
			}

			buf := &bytes.Buffer{}
			err = tpl.Execute(buf, search)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			buf.WriteTo(w)
		} else {
			cachedResults, err := giphyCache.Get(ctx, searchQuery).Result()
			if err != nil {
				panic(err)
			}

			cachedResultsData := &search.Results{}

			err = json.Unmarshal([]byte(cachedResults), &cachedResultsData)

			if err != nil {
				fmt.Println(err)
				return
			}

			search := &Search{
				Query:   searchQuery,
				Results: cachedResultsData,
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
