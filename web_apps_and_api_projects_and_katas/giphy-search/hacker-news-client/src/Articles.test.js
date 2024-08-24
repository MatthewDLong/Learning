import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Articles from "./Articles";

const server = setupServer(
  rest.get("https://hn.algolia.com/api/v1/search", (req, res, ctx) => {
    const query = req.url.searchParams.get("query");

    if (query === "Bar") {
      return res(
        ctx.json({
          hits: [
            {
              title: "Bar",
              url: "https://bar.org/bar",
              objectID: "23334319",
            },
          ],
        })
      );
    }

    return res(
      ctx.json({
        hits: [
          {
            title: "Foo",
            url: "https://foo.org/foo",
            objectID: "23334319",
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

it("renders an article called Foo", async () => {
  render(<Articles />);

  expect(
    await waitFor(() => screen.getByRole("link", { name: /Foo/i }))
  ).toBeInTheDocument();
});

it("renders an article called Bar when the user types Bar and hits Enter", async () => {
  render(<Articles />);

  userEvent.type(screen.getByLabelText(/search hacker news/i), "Bar{enter}");

  expect(
    await waitFor(() => screen.getByRole("link", { name: /bar/i }))
  ).toBeInTheDocument();
});

it("renders an article called Bar when the user Types Bar and clicks the Search button", async () => {
  render(<Articles />);

  userEvent.type(screen.getByLabelText(/search hacker news/i), "Bar");
  userEvent.click(screen.getByRole("button", { name: /search/i }));

  expect(
    await waitFor(() => screen.getByRole("link", { name: /bar/i }))
  ).toBeInTheDocument();
});

it("renders an error message when a user searches for Bar and the hacker rank api returns an error", async () => {
  server.use(
    rest.get("https://hn.algolia.com/api/v1/search", (req, res, ctx) => {
      return res.networkError("Internal server error");
    })
  );

  render(<Articles />);

  userEvent.type(screen.getByLabelText(/search hacker news/i), "Bar{enter}");

  expect(
    await waitFor(() => screen.getByText(/failed to load articles/i))
  ).toBeInTheDocument();
});
