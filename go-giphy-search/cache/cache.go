package cache

import (
	"fmt"

	"github.com/redis/go-redis/v9"
)

func NewCache(host string, port string) *redis.Client {
	var addr string
	if host == "" {
		addr = "localhost"
	} else {
		addr = host
	}

	var redisPort string
	if port == "" {
		port = "6379"
	} else {
		redisPort = port
	}

	cache := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%s:%s", addr, redisPort),
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	return cache
}
