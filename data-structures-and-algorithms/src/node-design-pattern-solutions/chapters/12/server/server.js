import { createServer } from "http";
import cluster from "cluster";
import os from "os";
import { log } from "console";

const PORT = 3000;

if (cluster.isMaster) {
  for (var i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  const server = createServer((req, res) => {
    let i = 1e9;
    while (i > 0) {
      i--;
    }
    return res.end(`hello from ${process.pid}`);
  });
  server.listen(PORT);
  log(`${process.pid} listening on ${PORT}`);
}
