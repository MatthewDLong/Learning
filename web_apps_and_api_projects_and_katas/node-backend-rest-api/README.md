# Node.js REST API

## Tech choices

- Node.js
- TypeScript
- pm2 (process management)
- artillery (load testing)
- jest, nock and supertest for double loop TDD and integration testing of API
- express (Node HTTP server)
- node --prof for profiling
- axios for outgoing HTTP requests

## Programming style

- OOP

## Design patterns used

Singleton and factory creational patterns.

## API Endpoints

### `/cards`

This endpoint returns a list of cards.
- `imageUrl` should be the image found on the template that corresponds to the first page for the card.
- `url` should have the format `/cards/[id]`

Expected JSON response from `GET /cards`:

```json
[
  {
    "title": "card 1 title",
    "imageUrl": "/front-cover-portrait-1.jpg",
    "url": "/cards/card001"
  },
  {
    "title": "card 2 title",
    "imageUrl": "/front-cover-portrait-2.jpg",
    "url": "/cards/card002"
  },
  {
    "title": "card 3 title",
    "imageUrl": "/front-cover-landscape.jpg",
    "url": "/cards/card003"
  }
]
```

### `/cards/[cardId]/[sizeId]`

This endpoint returns a single card identified by its `id`. It takes an optional route parameter `sizeId` - the sizing of a card affects its price.

- `price` is calculated by the multiplying the `basePrice` of the card by the `priceMultiplier` from the selected size. If no size is provided it should default to the `basePrice`.  The `basePrice` is the amount in pence and the result should be formatted as
a string e.g. `"£2.00"`.

Expected JSON response from `GET /cards/card001/gt`:

```json
{
  "title": "card 1 title",
  "size": "gt",
  "availableSizes": [
    {
      "id": "sm",
      "title": "Small"
    },
    {
      "id": "md",
      "title": "Medium"
    },
    {
      "id": "gt",
      "title": "Giant"
    }
  ],
  "imageUrl": "/front-cover-portrait-1.jpg",
  "price": "£4.00",
  "pages": [
    {
      "title": "Front Cover",
      "width": 300,
      "height": 600,
      "imageUrl": "/front-cover-portrait-1.jpg"
    },
    {
      "title": "Inside Left",
      "width": 300,
      "height": 600,
      "imageUrl": ""
    },
    {
      "title": "Inside Right",
      "width": 300,
      "height": 600,
      "imageUrl": ""
    },
    {
      "title": "Back Cover",
      "width": 300,
      "height": 600,
      "imageUrl": "/back-cover-portrait.jpg"
    }
  ]
}
```
