import * as nock from "nock";
import * as request from "supertest";
import * as config from "config";
import { app } from "../server";
import { cardsMockResponse } from "./fixtures/moonpig/cards";
import { sizesMockResponse } from "./fixtures/moonpig/sizes";
import { templatesMockResponse } from "./fixtures/moonpig/templates";
import { FormattedCardsList, FormattedCard, ErrorResponse } from "../types";

describe("Cards service", () => {
  describe("/cards", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it("GET /cards returns expected formatted cards list response", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, cardsMockResponse);
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, templatesMockResponse);

      const res: request.Response = await request(app).get("/cards");

      const expectedCardsListResponse: FormattedCardsList = [
        {
          title: "card 1 title",
          imageUrl: "/front-cover-portrait-1.jpg",
          url: "/cards/card001",
        },
        {
          title: "card 2 title",
          imageUrl: "/font-cover-portrait-2.jpg",
          url: "/cards/card002",
        },
        {
          title: "card 3 title",
          imageUrl: "/front-cover-landscape.jpg",
          url: "/cards/card003",
        },
      ];

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedCardsListResponse);
    });

    it("GET /cards returns a descriptive error message when the MoonPig upstream data source responds with a 200 OK and an empty response", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, ``);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, ``);

      const res: request.Response = await request(app).get("/cards");

      const expectedResponse: ErrorResponse = {
        errorMessage: "Internal server error: upstream data source failed",
      };

      expect(res.status).toEqual(500);
      expect(res.body).toEqual(expectedResponse);
    });

    it("GET /cards returns a descriptive error message when the MoonPig upstream data source responds with a 500 Internal Server Error", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .replyWithError("Internal Server Error");

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .replyWithError("Internal Server Error");

      const res: request.Response = await request(app).get("/cards");

      const expectedResponse: ErrorResponse = {
        errorMessage: "Internal server error: upstream data source failed",
      };

      expect(res.status).toEqual(500);
      expect(res.body).toEqual(expectedResponse);
    });
  });

  describe("/:cardId/:sizeId?", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it("GET /cards/card001/gt returns expected formatted card response", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, cardsMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/sizes.json")
        .reply(200, sizesMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, templatesMockResponse);

      const res: request.Response = await request(app).get("/cards/card001/gt");

      const expectedCardResponse: FormattedCard = {
        title: "card 1 title",
        size: "gt",
        availableSizes: [
          {
            id: "sm",
            title: "Small",
          },
          {
            id: "md",
            title: "Medium",
          },
          {
            id: "gt",
            title: "Giant",
          },
        ],
        imageUrl: "/front-cover-portrait-1.jpg",
        price: "£4.00",
        pages: [
          {
            title: "Front Cover",
            width: 300,
            height: 600,
            imageUrl: "/front-cover-portrait-1.jpg",
          },
          {
            title: "Inside Left",
            width: 300,
            height: 600,
            imageUrl: "",
          },
          {
            title: "Inside Right",
            width: 300,
            height: 600,
            imageUrl: "",
          },
          {
            title: "Back Cover",
            width: 300,
            height: 600,
            imageUrl: "/back-cover-portrait.jpg",
          },
        ],
      };

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedCardResponse);
    });

    it("returns a 400 status and a descriptive error message when a sizeId that is not available is requested", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, cardsMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/sizes.json")
        .reply(200, sizesMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, templatesMockResponse);

      const unavailableSizeId = "lg";

      const res: request.Response = await request(app).get(
        `/cards/card001/${unavailableSizeId}`
      );

      const expectedResponse: ErrorResponse = {
        errorMessage: "Card size 'lg' is not available for card 'card001'",
      };

      expect(res.status).toEqual(400);
      expect(res.body).toEqual(expectedResponse);
    });

    it("GET /cards/card001/md returns a descriptive error message when the MoonPig upstream data source responds with a 200 OK and an empty response", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, ``);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/sizes.json")
        .reply(200, ``);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, ``);

      const res: request.Response = await request(app).get("/cards/card001/md");

      const expectedResponse: ErrorResponse = {
        errorMessage: "Internal server error: upstream data source failed",
      };

      expect(res.status).toEqual(500);
      expect(res.body).toEqual(expectedResponse);
    });

    it("returns a 400 status and a descriptive error message when an invalid cardId is given", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, cardsMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/sizes.json")
        .reply(200, sizesMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, templatesMockResponse);

      const res: request.Response = await request(app).get("/cards/invalid");

      const expectedResponse: ErrorResponse = {
        errorMessage: "Invalid cardId supplied: invalid",
      };

      expect(res.status).toBe(400);
      expect(res.body).toEqual(expectedResponse);
    });

    it("returns a 400 status and a descriptive error message when an invalid sizeId is given", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .reply(200, cardsMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/sizes.json")
        .reply(200, sizesMockResponse);

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .reply(200, templatesMockResponse);

      const res: request.Response = await request(app).get(
        "/cards/card001/invalid"
      );

      const expectedResponse: ErrorResponse = {
        errorMessage: "Invalid sizeId supplied: invalid",
      };

      expect(res.status).toBe(400);
      expect(res.body).toEqual(expectedResponse);
    });

    it("GET /does-not-exist returns a 404", async () => {
      const res: request.Response = await request(app).get("/does-not-exist");
      expect(res.status).toBe(404);
    });

    it("GET /cards/card001/md returns a descriptive error message when the MoonPig upstream data source responds with a 500 Internal Server Error", async () => {
      const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/cards.json")
        .replyWithError("Internal Server Error");

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/sizes.json")
        .replyWithError("Internal Server Error");

      nock(moonpigBaseURL)
        .get("/tech-test-node-backend/templates.json")
        .replyWithError("Internal Server Error");

      const res: request.Response = await request(app).get("/cards/card001/md");

      const expectedResponse: ErrorResponse = {
        errorMessage: "Internal server error: upstream data source failed",
      };

      expect(res.status).toEqual(500);
      expect(res.body).toEqual(expectedResponse);
    });
  });
});
