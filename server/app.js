import * as bodyParser from "body-parser";
import express from "express";

import { BASE_ROUTER } from "./routes";

class App {
  App = express();
  port = process.env.PORT || 8111;
  baseUrl = "/api";
  router = BASE_ROUTER;

  bootstrap() {
    this.initMiddlewares();
    this.listen();
  }

  initMiddlewares() {
    this.App.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.header(
        "Access-Control-Expose-Headers",
        "Content-Length,Content-Range"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
    this.App.use(bodyParser.json());
    this.App.use(bodyParser.urlencoded({ extended: false }));
    this.App.use(`${this.baseUrl}`, this.router);
  }

  listen() {
    this.App.get(`${this.baseUrl}/risk-profiles/health`, (_, res) =>
      res.json({ message: "Health!" })
    );

    const server = this.App.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Mock server is running at http://localhost:${this.port}`);

      process
        .on("exit", () => {
          server.close();
        })
        .on("SIGINT", () => {
          server.close();
          // eslint-disable-next-line no-console
          console.log(
            `Mock server which was running at http://localhost:${this.port} has been closed.`
          );
        });
    });
  }
}

export default new App();
