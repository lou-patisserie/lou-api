import { Router } from "express";
import {
  getAllAddOns,
  createAddOns,
  updateAddOnById,
  deleteAddOnById,
  getAddOnsByName,
} from "../../controller/add-ons.controller.js";

import { adminAuthorization } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllAddOns);
router.get("/search", getAddOnsByName);
router.post("/", adminAuthorization, createAddOns);
router.put("/:ID", adminAuthorization, updateAddOnById);
router.delete("/:ID", adminAuthorization, deleteAddOnById);

export default router;
