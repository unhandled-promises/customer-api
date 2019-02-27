import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";

// Put dotenv in use before importing controllers
dotenv.config();

// Import controllers
import customersController from "./customers/customers.controller";

// Create the express application
const app = express();

// Assign controllers to routes
app.use("/api/customers", customersController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve("..", "frontend", "build")));

// Intercept requests to return the frontend's static entry point
// app.get("*", (request, response) => {
//   response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
// });

export default app;
