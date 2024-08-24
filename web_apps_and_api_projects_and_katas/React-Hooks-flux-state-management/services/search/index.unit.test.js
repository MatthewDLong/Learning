import { get } from "./index";

const emptyFixture = require("./fixtures/empty.json");
const greeceFixture = require("./fixtures/Greece.json");

describe("Search service", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterAll(() => {
    fetch.resetMocks();
  });

  test("Throws an error when no searchTerm and maxResults arguments supplied", async () => {
    fetch.mockResponseOnce(JSON.stringify(emptyFixture));
    await get().catch(err => {
      expect(err.message).toEqual("Not enough arguments supplied");
    });
  });

  test("Returns no results for '~~' searchTerm", async () => {
    fetch.mockResponseOnce(JSON.stringify(emptyFixture));
    await get("~~", 6).then(results => {
      expect(results).toEqual(emptyFixture);
      expect(fetch.mock.calls.length).toEqual(1);
    });
  });

  test("Returns 6 results for 'Greece' searchTerm, and maxResults given as 6", async () => {
    fetch.mockResponseOnce(JSON.stringify(greeceFixture));
    await get('Greece', 6).then(results => {
      expect(results).toEqual(greeceFixture);
      expect(results.results.docs.length).toEqual(6);
    });
  });
});
