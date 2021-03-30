import MoonPigService from "./services/MoonPigService";
import { createMoonPigService } from "./singleton";

jest.mock("./services/MoonPigService");

describe("singleton creation", () => {
  it("creates a new MoonPigService instance", () => {
    const client = jest.fn();

    const moonpig = createMoonPigService(client).getInstance();

    expect(MoonPigService).toBeCalledWith(client);
  });

  it("only creates one MoonPigService instance when invoked twice", () => {
    const client = jest.fn();

    const moonpigA = createMoonPigService(client).getInstance();
    const moonpigB = createMoonPigService(client).getInstance();

    expect(moonpigA === moonpigB).toBeTruthy();
  });
});
