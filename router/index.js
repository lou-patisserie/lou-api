import express from "express";
import homeRoutes from "./v1/home.router.js";
import authRoutes from "./v1/auth.router.js";
import productTypeRoutes from "./v1/product-type.router.js";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/product-types", productTypeRoutes);

export default router;
