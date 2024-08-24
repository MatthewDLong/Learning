import BaseService from "./BaseService";
import { createCurrencyFormatter } from "../factory";

import {
  Card,
  FormattedCard,
  Cards,
  FormattedCardsList,
  FormattedCardListItem,
  Pages,
  Page,
  FormattedPage,
  Sizes,
  Size,
  Templates,
  Template,
} from "../types";

class MoonPigService extends BaseService {
  cards: Cards;
  card: Card;
  sizes: Sizes;
  templates: Templates;
  currencyFormatter: Intl.NumberFormat;

  constructor(client) {
    super(client);
    this.currencyFormatter = createCurrencyFormatter();
  }

  async loadCards() {
    const cardsResponse = await this.client.get(
      "/tech-test-node-backend/cards.json"
    );
    this.cards = cardsResponse.data;
    return this;
  }

  async loadSizes() {
    const sizesResponse = await this.client.get(
      "/tech-test-node-backend/sizes.json"
    );
    this.sizes = sizesResponse.data;
    return this;
  }

  async loadTemplates() {
    const templatesResponse = await this.client.get(
      "/tech-test-node-backend/templates.json"
    );
    this.templates = templatesResponse.data;
    return this;
  }

  cardsListDataIsEmpty() {
    return (
      this.cards === undefined ||
      this.cards === null ||
      this.cards.length === 0 ||
      this.templates === undefined ||
      this.templates === null ||
      this.templates.length === 0
    );
  }

  cardDataIsEmpty() {
    return (
      this.cards === undefined ||
      this.cards === null ||
      this.cards.length === 0 ||
      this.sizes === undefined ||
      this.sizes === null ||
      this.sizes.length === 0 ||
      this.templates === undefined ||
      this.templates === null ||
      this.templates.length === 0
    );
  }

  cardSizeIsAvailable(cardId: string, sizeId = "md"): boolean {
    this.getCard(cardId);
    return this.card.sizes.includes(sizeId);
  }

  formatCardsList() {
    const formatCardListItem = (card: Card): FormattedCardListItem => {
      const frontCover = this.getFrontCover(card.pages);
      const template = this.getTemplate(frontCover.templateId, this.templates);

      return {
        title: card.title,
        imageUrl: template.imageUrl,
        url: `/cards/${card.id}`,
      };
    };
    const cardsList: FormattedCardsList = this.cards.map(formatCardListItem);

    return cardsList;
  }

  formatCard(sizeId = "md"): FormattedCard {
    const frontCover: Page = this.getFrontCover(this.card.pages);
    const template: Template = this.getTemplate(
      frontCover.templateId,
      this.templates
    );
    const availableSizes = this.getAvailableSizes(this.card.sizes, this.sizes);
    const pages: FormattedPage[] = this.getPages(
      this.card.pages,
      this.templates
    );

    const calculatePrice = (basePrice: number, priceMultiplier): number =>
      (basePrice * priceMultiplier) / 100;

    const formatPrice = (): string => {
      const size: Size = this.getSize(sizeId, this.sizes);
      const price = calculatePrice(this.card.basePrice, size.priceMultiplier);
      return this.currencyFormatter.format(price);
    };

    return {
      title: this.card.title,
      size: sizeId,
      availableSizes,
      imageUrl: template.imageUrl,
      price: formatPrice(),
      pages,
    };
  }

  getCard(cardId: string) {
    const card: Card = this.cards.filter((card) => card.id === cardId)[0];
    this.card = card;
    return this;
  }

  getTemplate(templateId: string, templates: Templates): Template {
    return templates.filter((template) => template.id === templateId)[0];
  }

  getAvailableSizes(cardSizes: string[], sizes: Sizes) {
    return sizes
      .filter((size) => cardSizes.includes(size.id))
      .map((availableSize) => ({
        id: availableSize.id,
        title: availableSize.title,
      }));
  }

  getSize(sizeId, sizes: Sizes): Size {
    return sizes.filter((size) => size.id === sizeId)[0];
  }

  getPages(pages: Pages, templates: Templates) {
    const formatPage = (page: Page): FormattedPage => {
      const template = this.getTemplate(page.templateId, this.templates);

      return {
        title: page.title,
        width: template.width,
        height: template.height,
        imageUrl: template.imageUrl,
      };
    };

    return pages.map(formatPage);
  }

  getFrontCover(pages: Pages): Page {
    return pages.filter((page) => page.title === "Front Cover")[0];
  }
}

export default MoonPigService;
