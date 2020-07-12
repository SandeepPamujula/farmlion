import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";

class App {
  public app: express.Application;
  public route: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.route.routes(this.app);

    const PORT = process.env.PORT || 4001;
    this.app.listen(PORT, () =>
      console.log(`products server running on ${PORT}`)
    );
  }

  private config(): void {
    // Connect to MongoDB
    mongoose.Promise = bluebird;
    const mongoUrl =
      "mongodb+srv://sindhu:sindhu1234@customers-9xbiq.mongodb.net/products?retryWrites=true&w=majority";
    // "mongodb+srv://sindhu:sindhu1234@customers-9xbiq.mongodb.net/products?retryWrites=true&w=majority";
    mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      })
      .catch((err) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. " +
            err
        );
        // process.exit();
      });
    // support application/json type post data
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;
