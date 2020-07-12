import errorHandler from "errorhandler";
import cors from "cors";
import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions));

/**
 * Start Express server.
 */
const server = app.listen(5001, () => {
   /* console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );*/
    console.log("  Press CTRL-C to stop\n");
});

export default server;
