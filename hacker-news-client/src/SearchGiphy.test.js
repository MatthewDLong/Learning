import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchGiphy from "./SearchGiphy";

const server = setupServer(
  rest.get("https://api.giphy.com/v1/gifs/random", (req, res, ctx) =>
    res(
      ctx.json({
        data: {
          fixed_height_downsampled_url: "https://.giphy.com/foo.gif",
        },
      })
    )
  )
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

it("should search the Giphy API and render the gif returned when the user searches and presses enter", async () => {
  render(<SearchGiphy />);

  userEvent.type(
    screen.getByRole("textbox", { name: /search giphy/i }),
    "foo{enter}"
  );

  expect(await screen.findByRole("link", { name: /foo/i })).toBeInTheDocument();
  expect(await screen.findByRole("img", { name: /foo/i })).toBeInTheDocument();
});
