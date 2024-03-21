import morgan from "morgan";

const morganMiddleware = (app) => {
  app.use(morgan("combined"));
};

export default morganMiddleware;
