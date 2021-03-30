import * as config from "config";
import MoonPigService from "../services/MoonPigService";
import { validateCardId, validateSizeId } from "../middleware/validation";
import { responseHeaders } from "../middleware/responseHeaders";
import { createMoonPigService } from "../singleton";
import { createHttpClient } from "../factory";
import { AxiosInstance } from "axios";
import { Router, Request, Response } from "express";
import { FormattedCardsList, FormattedCard } from "../types";

const router: Router = Router();

const moonpigBaseURL: string = config.get("services.moonpig.baseURL");
const moonpigJsonClient: AxiosInstance = createHttpClient(moonpigBaseURL);

const moonpig: MoonPigService = createMoonPigService(
  moonpigJsonClient
).getInstance();

router.get("/", responseHeaders, async (_req: Request, res: Response, next) => {
  try {
    await moonpig.loadCards();
    await moonpig.loadTemplates();
  } catch (err) {
    res.status(500).send({
      errorMessage: "Internal server error: upstream data source failed",
    });
    return next(err);
  }

  if (moonpig.cardsListDataIsEmpty()) {
    return res.status(500).send({
      errorMessage: "Internal server error: upstream data source failed",
    });
  }

  const formattedCardsList: FormattedCardsList = moonpig.formatCardsList();

  res.json(formattedCardsList);
});

router.get(
  "/:cardId/:sizeId?",
  responseHeaders,
  validateCardId,
  validateSizeId,
  async (req: Request, res: Response, next) => {
    const { cardId, sizeId } = req.params;

    try {
      await moonpig.loadCards();
      await moonpig.loadSizes();
      await moonpig.loadTemplates();
    } catch (err) {
      res.status(500).send({
        errorMessage: "Internal server error: upstream data source failed",
      });
      return next(err);
    }

    if (moonpig.cardDataIsEmpty()) {
      return res.status(500).send({
        errorMessage: "Internal server error: upstream data source failed",
      });
    }

    if (!moonpig.cardSizeIsAvailable(cardId, sizeId)) {
      return res.status(400).send({
        errorMessage: `Card size '${sizeId}' is not available for card '${cardId}'`,
      });
    }

    const formattedCard: FormattedCard = moonpig
      .getCard(cardId)
      .formatCard(sizeId);

    res.json(formattedCard);
  }
);

export default router;
