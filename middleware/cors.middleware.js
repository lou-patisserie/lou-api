import cors from "cors";
// import StandardError from "../utils/constant/standard-error";

// const origin = [
//   "https://loupatisserie.com",
//   "https://www.loupatisserie.com",
//   "https://admin.loupatisserie.com",
//   "http://localhost:11920",
// ];

// const corsOptionsDelegate = (req, callback) => {
//   const clientOrigin = origin.includes(req.header("Origin"));

//   if (clientOrigin) {
//     callback(null, {
//       origin: true,
//       methods: "GET,POST,DELETE,PUT,OPTIONS,HEAD",
//     });
//   } else {
//     callback(
//       new StandardError({
//         success: false,
//         message: "You're not allowed to access this resource!",
//         status: 403,
//       })
//     );
//   }
// };

const corsMiddleware = (app) => {
  app.use(cors());
};

export default corsMiddleware;
