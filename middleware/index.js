import bodyParserMiddleware from "./body-parser.middleware.js";
import corsMiddleware from "./cors.middleware.js";
import helmetMiddleware from "./helmet.middleware.js";
import morganMiddleware from "./morgan.middleware.js";

const middleware = (app) => {
  bodyParserMiddleware(app);
  corsMiddleware(app);
  helmetMiddleware(app);
  morganMiddleware(app);
};

export default middleware;
