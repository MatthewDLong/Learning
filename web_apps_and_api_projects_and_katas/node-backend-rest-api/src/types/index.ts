export interface IService {
  client;
}

export interface Page {
  title: string;
  templateId: string;
}

export interface FormattedPage {
  title: string;
  width: number;
  height: number;
  imageUrl: string;
}

export type Pages = Page[];

export interface Card {
  id: string;
  title: string;
  sizes: string[];
  basePrice: number;
  pages: Pages;
}

export type Cards = Card[];

export type FormattedCard = {
  title: string;
  size: string;
  availableSizes: {
    id: string;
    title: string;
  }[];
  imageUrl: string;
  price: string;
  pages: FormattedPage[];
};

export interface FormattedCardListItem {
  title: string;
  imageUrl: string;
  url: string;
}

export type FormattedCardsList = FormattedCardListItem[];

export interface Size {
  id: string;
  title: string;
  priceMultiplier: number;
}

export type Sizes = Size[];

export interface Template {
  id: string;
  width: number;
  height: number;
  imageUrl: string;
}

export type Templates = Template[];

export interface ErrorResponse {
  errorMessage: string;
}
