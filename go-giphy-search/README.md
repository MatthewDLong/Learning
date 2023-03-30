# go-giphy-search

Search the Giphy API for gifs.

Uses the following technologies:

- Go
- Docker
- HTTP
- Redis
- RedisStack
- HTML
- CSS

## Architecture

![Architecture](./docs-images/go-giphy-search.drawio.png)

## Prerequisites

- Go
- Docker
- [air](https://github.com/cosmtrek/air)
- Giphy development API key, see https://developers.giphy.com/explorer/

## Installation / Running go-giphy-search locally

Get a Giphy Search API key and set it in `.env.development`

`cd <INSTALLATION-DIRECTORY/go-giphy-search> && air`

## Redis

### Running Redis and RedisInsight locally with Docker

`docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest`

Browse to `http://localhost:8001/` to access RedisInsight

### Running redis-cli on redis-stack Docker container

`docker exec -it redis-stack redis-cli`

## Example Giphy Search API response

```json
{
  "data": [
    {
      "type": "gif",
      "id": "n2IPMYMthV0m4",
      "url": "https://giphy.com/gifs/end-bible-rapture-n2IPMYMthV0m4",
      "slug": "end-bible-rapture-n2IPMYMthV0m4",
      "bitly_gif_url": "http://gph.is/1JkJUoP",
      "bitly_url": "http://gph.is/1JkJUoP",
      "embed_url": "https://giphy.com/embed/n2IPMYMthV0m4",
      "username": "",
      "source": "http://www.endtimesprophecywatch.com/",
      "title": "breaking news GIF",
      "rating": "g",
      "content_url": "",
      "source_tld": "www.endtimesprophecywatch.com",
      "source_post_url": "http://www.endtimesprophecywatch.com/",
      "is_sticker": 0,
      "import_datetime": "2015-08-27 08:07:10",
      "trending_datetime": "0000-00-00 00:00:00",
      "images": {
        "original": {
          "height": "180",
          "width": "256",
          "size": "339203",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.gif\u0026ct=g",
          "mp4_size": "135100",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.mp4\u0026ct=g",
          "webp_size": "71316",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.webp\u0026ct=g",
          "frames": "27",
          "hash": "d0636429dce8a74f273dd2771404e41c"
        },
        "downsized": {
          "height": "180",
          "width": "256",
          "size": "339203",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.gif\u0026ct=g"
        },
        "downsized_large": {
          "height": "180",
          "width": "256",
          "size": "339203",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.gif\u0026ct=g"
        },
        "downsized_medium": {
          "height": "180",
          "width": "256",
          "size": "339203",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.gif\u0026ct=g"
        },
        "downsized_small": {
          "height": "180",
          "width": "256",
          "mp4_size": "59347",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy-downsized-small.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy-downsized-small.mp4\u0026ct=g"
        },
        "downsized_still": {
          "height": "180",
          "width": "256",
          "size": "339203",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy_s.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy_s.gif\u0026ct=g"
        },
        "fixed_height": {
          "height": "200",
          "width": "284",
          "size": "333077",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/200.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200.gif\u0026ct=g",
          "mp4_size": "63858",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/200.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200.mp4\u0026ct=g",
          "webp_size": "76420",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/200.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200.webp\u0026ct=g"
        },
        "fixed_height_downsampled": {
          "height": "200",
          "width": "284",
          "size": "93159",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/200_d.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200_d.gif\u0026ct=g",
          "webp_size": "60466",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/200_d.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200_d.webp\u0026ct=g"
        },
        "fixed_height_small": {
          "height": "100",
          "width": "142",
          "size": "112444",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/100.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100.gif\u0026ct=g",
          "mp4_size": "24707",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/100.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100.mp4\u0026ct=g",
          "webp_size": "35652",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/100.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100.webp\u0026ct=g"
        },
        "fixed_height_small_still": {
          "height": "100",
          "width": "142",
          "size": "10146",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/100_s.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100_s.gif\u0026ct=g"
        },
        "fixed_height_still": {
          "height": "200",
          "width": "284",
          "size": "22819",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/200_s.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200_s.gif\u0026ct=g"
        },
        "fixed_width": {
          "height": "141",
          "width": "200",
          "size": "183956",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/200w.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200w.gif\u0026ct=g",
          "mp4_size": "39334",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/200w.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200w.mp4\u0026ct=g",
          "webp_size": "51820",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/200w.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200w.webp\u0026ct=g"
        },
        "fixed_width_downsampled": {
          "height": "141",
          "width": "200",
          "size": "50704",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/200w_d.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200w_d.gif\u0026ct=g",
          "webp_size": "36500",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/200w_d.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200w_d.webp\u0026ct=g"
        },
        "fixed_width_small": {
          "height": "71",
          "width": "100",
          "size": "63551",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/100w.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100w.gif\u0026ct=g",
          "mp4_size": "15178",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/100w.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100w.mp4\u0026ct=g",
          "webp_size": "23688",
          "webp": "https://media4.giphy.com/media/n2IPMYMthV0m4/100w.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100w.webp\u0026ct=g"
        },
        "fixed_width_small_still": {
          "height": "71",
          "width": "100",
          "size": "6194",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/100w_s.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=100w_s.gif\u0026ct=g"
        },
        "fixed_width_still": {
          "height": "141",
          "width": "200",
          "size": "14119",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/200w_s.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=200w_s.gif\u0026ct=g"
        },
        "looping": {
          "mp4_size": "1986953",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy-loop.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy-loop.mp4\u0026ct=g"
        },
        "original_still": {
          "height": "180",
          "width": "256",
          "size": "27874",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy_s.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy_s.gif\u0026ct=g"
        },
        "original_mp4": {
          "height": "336",
          "width": "480",
          "mp4_size": "135100",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy.mp4\u0026ct=g"
        },
        "preview": {
          "height": "160",
          "width": "227",
          "mp4_size": "23099",
          "mp4": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy-preview.mp4?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy-preview.mp4\u0026ct=g"
        },
        "preview_gif": {
          "height": "96",
          "width": "137",
          "size": "49404",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy-preview.gif?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy-preview.gif\u0026ct=g"
        },
        "preview_webp": {
          "height": "168",
          "width": "238",
          "size": "48064",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/giphy-preview.webp?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=giphy-preview.webp\u0026ct=g"
        },
        "480w_still": {
          "height": "338",
          "width": "480",
          "size": "339203",
          "url": "https://media4.giphy.com/media/n2IPMYMthV0m4/480w_s.jpg?cid=a366b6bepei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c\u0026rid=480w_s.jpg\u0026ct=g"
        }
      },
      "user": {
        "avatar_url": "",
        "banner_image": "",
        "banner_url": "",
        "profile_url": "",
        "username": "",
        "display_name": "",
        "description": "",
        "instagram_url": "",
        "website_url": "",
        "is_verified": false
      },
      "analytics_response_payload": "e=Z2lmX2lkPW4ySVBNWU10aFYwbTQmZXZlbnRfdHlwZT1HSUZfU0VBUkNIJmNpZD1hMzY2YjZiZXBlaTkyMG0wejZwcm4yem10czZkZ3lkc2pzcHA4aHB5NWtlNmtzOWMmY3Q9Zw",
      "analytics": {
        "onload": {
          "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPW4ySVBNWU10aFYwbTQmZXZlbnRfdHlwZT1HSUZfU0VBUkNIJmNpZD1hMzY2YjZiZXBlaTkyMG0wejZwcm4yem10czZkZ3lkc2pzcHA4aHB5NWtlNmtzOWMmY3Q9Zw\u0026action_type=SEEN"
        },
        "onclick": {
          "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPW4ySVBNWU10aFYwbTQmZXZlbnRfdHlwZT1HSUZfU0VBUkNIJmNpZD1hMzY2YjZiZXBlaTkyMG0wejZwcm4yem10czZkZ3lkc2pzcHA4aHB5NWtlNmtzOWMmY3Q9Zw\u0026action_type=CLICK"
        },
        "onsent": {
          "url": "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPW4ySVBNWU10aFYwbTQmZXZlbnRfdHlwZT1HSUZfU0VBUkNIJmNpZD1hMzY2YjZiZXBlaTkyMG0wejZwcm4yem10czZkZ3lkc2pzcHA4aHB5NWtlNmtzOWMmY3Q9Zw\u0026action_type=SENT"
        }
      }
    },
    ...
  ],
  "pagination": { "total_count": 31959, "count": 4, "offset": 0 },
  "meta": {
    "status": 200,
    "msg": "OK",
    "response_id": "pei920m0z6prn2zmts6dgydsjspp8hpy5ke6ks9c"
  }
}

```