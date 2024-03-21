import bodyParserMiddleware from "./body-parser.middleware.js";
import corsMiddleware from "./cors.middleware.js";
import helmetMiddleware from "./helmet.middleware.js";

const middleware = (app) => {
  bodyParserMiddleware(app);
  corsMiddleware(app);
  helmetMiddleware(app);
};

export default middleware;
