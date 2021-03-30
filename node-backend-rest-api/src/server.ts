import * as express from "express";
import * as compression from "compression";
import * as helmet from "helmet";
import cardsRouter from "./routes/cards";

const os = require("os");
const cluster = require("cluster");

const app = express();

app.set("json spaces", 2);
app.set("json escape", true);
app.set("x-powered-by", false);
app.use(compression());
app.use(helmet());
app.use("/cards", cardsRouter);

const startCluster = (app, port: number): void => {
  if (cluster.isMaster) {
    const cpuCount: number = os.cpus().length;

    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
  } else {
    app.listen(port);
  }
};

export { app, startCluster };
