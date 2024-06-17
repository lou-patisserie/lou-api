import { Router } from "express";
import {
  getAllAboutCake,
  getAboutCakeById,
  createAboutCake,
  updateAboutCakeById,
  deleteAboutCakeById,
  getAboutCakeByCakeId,
} from "../../controller/about-cakes.controller.js";
import { adminAuthorization } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllAboutCake);
router.get("/:ID", getAboutCakeById);
router.post("/", adminAuthorization, createAboutCake);
router.put("/:ID", adminAuthorization, updateAboutCakeById);
router.delete("/:ID", adminAuthorization, deleteAboutCakeById);
router.get("/cake/:cake_id", getAboutCakeByCakeId);

export default router;
