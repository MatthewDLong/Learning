import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Search from "./Search";

const server = setupServer(
  rest.get("https://api.giphy.com/v1/gifs/random", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          fixed_height_downsampled_url: "https://giphy.com/foo.gif",
        },
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

it("should render a heading", () => {
  render(<Search />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
});

it("should render a footer", () => {
  render(<Search />);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

it("should render a link to a giphy when a user types a search and presses enter", async () => {
  render(<Search apiKey="abc123" />);

  const searchTermInput = screen.getByLabelText(/Search Giphy:/i);

  userEvent.type(searchTermInput, "foo{enter}");

  expect(
    await waitFor(() => screen.getByRole("link", { name: /foo/i }))
  ).toBeInTheDocument();
});

it("should render a giphy when a user types a search term and presses enter", async () => {
  render(<Search apiKey="abc123" />);

  const searchTermInput = screen.getByLabelText(/Search Giphy:/i);

  userEvent.type(searchTermInput, "foo{enter}");

  expect(
    await waitFor(() => screen.getByRole("img", { name: /foo/i }))
  ).toBeInTheDocument();
});
