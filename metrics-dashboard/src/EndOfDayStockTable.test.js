import { setupServer } from "msw/node";
import { rest } from "msw";
import { findByTestId, render, screen } from "@testing-library/react";
import EndOfDayStockTable from "./EndOfDayStockTable";

const server = setupServer(
  rest.get("http://api.marketstack.com/v1/eod", (req, res, ctx) => {
    return res(
      ctx.json({
        pagination: { limit: 4, offset: 0, count: 4, total: 1008 },
        data: [
          {
            open: 146.19,
            high: 149.05,
            low: 145.84,
            close: 148.89,
            symbol: "AAPL",
            date: "2021-08-12T00:00:00+0000",
          },
        ],
      })
    );
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

it("renders a table", () => {
  render(<EndOfDayStockTable />);

  expect(screen.getByRole("table")).toBeInTheDocument();
});

it("renders a column header", () => {
  render(<EndOfDayStockTable />);

  expect(
    screen.getByRole("columnheader", { name: /symbol/i })
  ).toBeInTheDocument();
});

it("renders historical end of day stock data for AAPL", async () => {
  render(<EndOfDayStockTable />);

  expect(await screen.findByTestId("symbol")).toHaveTextContent(/AAPL/);

  expect(await screen.findByTestId("open")).toHaveTextContent(/146\.19/i);
});

it("renders dates in the correct format as dd/MM/yyyy", async () => {
  render(<EndOfDayStockTable />);

  expect(await screen.findByTestId("date")).toHaveTextContent(/12\/08\/2021/i);
});
