import axios, { AxiosInstance } from "axios";

const createHttpClient = (
  baseURL: string,
  timeout = 10000,
  type = "application/json",
  headers = {}
): AxiosInstance =>
  axios.create({
    baseURL,
    timeout,
    headers: {
      Accept: `${type}`,
      ...headers,
    },
  });

const createCurrencyFormatter = (
  format = "en-GB",
  currency = "GBP",
  minimumFractionDigits = 2
): Intl.NumberFormat =>
  new Intl.NumberFormat(format, {
    style: "currency",
    currency,
    minimumFractionDigits,
  });

export { createHttpClient, createCurrencyFormatter };
