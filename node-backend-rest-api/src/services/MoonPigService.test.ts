import { createMoonPigService } from "../singleton";
import { cardsMockResponse } from "../__tests__/fixtures/moonpig/cards";
import { sizesMockResponse } from "../__tests__/fixtures/moonpig/sizes";
import { templatesMockResponse } from "../__tests__/fixtures/moonpig/templates";
import { FormattedCardsList, FormattedCard } from "../types";

describe("MoonPigService", () => {
  const client = {
    get: jest.fn(),
  };

  const moonpig = createMoonPigService(client).getInstance();

  describe("upstream data source", () => {
    afterEach(() => {
      client.get.mockReset();
    });

    it("cardsListDataIsEmpty returns true when either cards.json or templates.json is empty", async () => {
      client.get
        .mockImplementationOnce(() => ({ data: `` }))
        .mockImplementationOnce(() => ({ data: sizesMockResponse }));

      await moonpig.loadCards();
      await moonpig.loadSizes();

      expect(moonpig.cardsListDataIsEmpty()).toBeTruthy();
    });

    it("cardDataIsEmpty returns true when either cards.json, sizes.json or templates.json is empty", async () => {
      client.get
        .mockImplementationOnce(() => ({ data: `` }))
        .mockImplementationOnce(() => ({ data: sizesMockResponse }))
        .mockImplementationOnce(() => ({ data: `` }));

      await moonpig.loadCards();
      await moonpig.loadSizes();
      await moonpig.loadTemplates();

      expect(moonpig.cardsListDataIsEmpty()).toBeTruthy();
    });

    it("MoonPigService.loadCards() makes GET request for /tech-test-node-backend/cards.json with HTTP client", async () => {
      client.get.mockImplementationOnce(() => ({ data: cardsMockResponse }));

      await moonpig.loadCards();

      expect(client.get).toHaveBeenCalledWith(
        "/tech-test-node-backend/cards.json"
      );
    });

    it("MoonPigService.loadSizes() makes GET request for /tech-test-node-backend/sizes.json with HTTP client", async () => {
      client.get.mockImplementationOnce(() => ({ data: sizesMockResponse }));

      await moonpig.loadSizes();

      expect(client.get).toHaveBeenCalledWith(
        "/tech-test-node-backend/sizes.json"
      );
    });

    it("MoonPigService.loadTemplates() makes GET request for /tech-test-node-backend/sizes.json with HTTP client", async () => {
      client.get.mockImplementationOnce(() => ({
        data: templatesMockResponse,
      }));

      await moonpig.loadTemplates();

      expect(client.get).toHaveBeenCalledWith(
        "/tech-test-node-backend/templates.json"
      );
    });
  });

  describe("formatting", () => {
    afterEach(() => {
      client.get.mockReset();
    });

    it("formats a list of cards", async () => {
      client.get
        .mockImplementationOnce(() => ({ data: cardsMockResponse }))
        .mockImplementationOnce(() => ({ data: templatesMockResponse }));

      await moonpig.loadCards();
      await moonpig.loadTemplates();

      const formattedCardsList: FormattedCardsList = moonpig.formatCardsList();

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

      expect(formattedCardsList).toEqual(expectedCardsListResponse);
    });

    it("returns true if card size is available", async () => {
      client.get
        .mockImplementationOnce(() => ({ data: cardsMockResponse }))
        .mockImplementationOnce(() => ({ data: sizesMockResponse }))
        .mockImplementationOnce(() => ({ data: templatesMockResponse }));

      await moonpig.loadCards();
      await moonpig.loadSizes();
      await moonpig.loadTemplates();

      const cardId = "card001";

      moonpig.getCard(cardId);

      expect(moonpig.cardSizeIsAvailable(cardId)).toBeTruthy();
    });

    it("formats a medium (md) card", async () => {
      client.get
        .mockImplementationOnce(() => ({ data: cardsMockResponse }))
        .mockImplementationOnce(() => ({ data: sizesMockResponse }))
        .mockImplementationOnce(() => ({ data: templatesMockResponse }));

      await moonpig.loadCards();
      await moonpig.loadSizes();
      await moonpig.loadTemplates();

      const cardId = "card001";

      const formattedCard: FormattedCard = moonpig.getCard(cardId).formatCard();

      const expectedCardResponse: FormattedCard = {
        title: "card 1 title",
        size: "md",
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
        price: "£2.00",
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

      expect(formattedCard).toEqual(expectedCardResponse);
    });

    it("formats a giant (gt) card", async () => {
      client.get
        .mockImplementationOnce(() => ({ data: cardsMockResponse }))
        .mockImplementationOnce(() => ({ data: sizesMockResponse }))
        .mockImplementationOnce(() => ({ data: templatesMockResponse }));

      await moonpig.loadCards();
      await moonpig.loadSizes();
      await moonpig.loadTemplates();

      const cardId = "card001";
      const sizeId = "gt";

      const formattedCard: FormattedCard = moonpig
        .getCard(cardId)
        .formatCard(sizeId);

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

      expect(formattedCard).toEqual(expectedCardResponse);
    });
  });
});
