import { startCluster } from "./server";
import { init } from ".";

jest.mock("./server");

describe("Initialises the app", () => {
  it("should invoke startCluster", () => {
    init();

    expect(startCluster).toHaveBeenCalled();
  });
});
