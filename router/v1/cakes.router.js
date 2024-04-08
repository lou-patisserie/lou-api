import { Router } from "express";
import {
  createCake,
  getCakeById,
  getCakeByName,
  getAllCakes,
  updateCakeById,
  deleteCakeById,
  getCakesByFlexOptions,
} from "../../controller/cakes.controller.js";

import { adminAuthorization } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllCakes);
router.get("/name/:name", getCakeByName);
router.get("/:ID", getCakeById);
router.get("/search", getCakesByFlexOptions);
router.post("/", adminAuthorization, createCake);
router.put("/:ID", adminAuthorization, updateCakeById);
router.delete("/:ID", adminAuthorization, deleteCakeById);

export default router;
