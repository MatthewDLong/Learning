const os = require("os");
const cluster = require("cluster");

import { startCluster } from "./server";

jest.mock("os");
jest.mock("cluster");

describe("Starting the server", () => {
  it("should spawn a new Worker process for each logical CPU core", () => {
    (os.cpus as jest.Mock).mockReturnValue([
      {
        model: "Intel(R) Core(TM) i7-7820HQ CPU @ 2.90GHz",
        speed: 2900,
        times: {
          user: 15975060,
          nice: 0,
          sys: 12359020,
          idle: 114232930,
          irq: 0,
        },
      },
      {
        model: "Intel(R) Core(TM) i7-7820HQ CPU @ 2.90GHz",
        speed: 2900,
        times: {
          user: 1428000,
          nice: 0,
          sys: 1151540,
          idle: 139978590,
          irq: 0,
        },
      },
      {
        model: "Intel(R) Core(TM) i7-7820HQ CPU @ 2.90GHz",
        speed: 2900,
        times: {
          user: 14577120,
          nice: 0,
          sys: 8293430,
          idle: 119687840,
          irq: 0,
        },
      },
    ]);

    const app = {};
    const port = 7000;

    startCluster({}, port);

    expect(cluster.fork).toHaveBeenCalledTimes(3);
  });

  it("should listen on port 7000", () => {
    cluster.isMaster = false;
    const app = { listen: jest.fn() };
    const port = 7000;

    startCluster(app, port);

    expect(app.listen).toBeCalledWith(7000);
  });
});
