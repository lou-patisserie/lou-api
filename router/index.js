import express from "express";
import homeRoutes from "./v1/home.router.js";
import authRoutes from "./v1/auth.router.js";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/api/v1/auth", authRoutes);

export default router;
