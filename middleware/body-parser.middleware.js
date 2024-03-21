import bodyParser from "body-parser";

const bodyParserMiddleware = (app) => {
  app.use(bodyParser.json());
};

export default bodyParserMiddleware;
