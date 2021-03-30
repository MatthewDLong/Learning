import { app, startCluster } from "./server";

const port: number = 7000;

export const init = () => {
  startCluster(app, port);
};

init();
