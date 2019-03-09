import * as dotenv from "dotenv";
import * as express from "express";
import Token from "./util/auth";

// Put dotenv in use before importing controllers
dotenv.config();

// Import controllers
import customersController from "./customers/customers.controller";

// Create the express application
const app = express();

const allowCrossDomain = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

    // intercept OPTIONS method
    if ("OPTIONS" === req.method) {
      res.send(200);
    } else {
      next();
    }
};

// Allows CORS domain
app.use(allowCrossDomain);

// Assign controllers to routes
app.use("/api/customers", customersController);

// Init Token
Token.init();

export default app;
