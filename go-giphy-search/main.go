package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/matt-k8s/Learning/go-giphy-search/handlers"
	"github.com/matt-k8s/Learning/go-giphy-search/search"
)

func main() {
	err := godotenv.Load(".env.development")
	if err != nil {
		log.Println("Error loading .env file")
	}

	webPort := os.Getenv("WEB_PORT")
	giphyApiKey := os.Getenv("GIPHY_API_KEY")

	if webPort == "" {
		webPort = "3000"
	}

	if giphyApiKey == "" {
		log.Fatal("GIPHY_API_KEY environment variable must be set")
	}

	giphyHttpClient := &http.Client{Timeout: 10 * time.Second}
	giphyApi := search.NewClient(giphyHttpClient, giphyApiKey)

	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("assets"))

	mux.HandleFunc("/", handlers.IndexHandler)
	mux.HandleFunc("/search", handlers.SearchHandler(giphyApi))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fs))

	http.ListenAndServe(":"+webPort, mux)
}
