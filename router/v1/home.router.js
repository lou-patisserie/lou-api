import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Lou-Patisserie API",
    version: "1.0.0",
    developed_by: "Grivo.id Team",
  });
});

export default router;
