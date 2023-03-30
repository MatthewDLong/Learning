package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/matt-k8s/Learning/news-page/handlers"
	"github.com/matt-k8s/Learning/news-page/news"
)

func main() {
	err := godotenv.Load(".env.development")
	if err != nil {
		log.Println("Error loading .env file")
	}

	webPort := os.Getenv("WEB_PORT")
	apiKey := os.Getenv("NEWS_API_KEY")

	if webPort == "" {
		webPort = "3000"
	}

	if apiKey == "" {
		log.Fatal("NEWS_API_KEY environment variable must be set")
	}

	newsHttpClient := &http.Client{Timeout: 10 * time.Second}
	newsApi := news.NewClient(newsHttpClient, apiKey, 20)

	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("assets"))

	mux.HandleFunc("/", handlers.IndexHandler)
	mux.HandleFunc("/search", handlers.SearchHandler(newsApi))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	http.ListenAndServe(":"+webPort, mux)
}
