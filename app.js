import dotenv from "dotenv";
import express from "express";
import useMiddleware from "./middleware/index.js";
import { dbConn } from "./config/dbConfig.js";
import routes from "./router/index.js";
import HttpErrorsNotFound from "./utils/http-errors/not-found-error.js";
import errorHandlerMiddleware from "./middleware/error-handler.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Db connection
dbConn();

// Use middleware
useMiddleware(app);

// Use routes
app.use(routes);

// Use 404 error
app.use(HttpErrorsNotFound);

// use error handler
app.use(errorHandlerMiddleware);

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
