import { Router } from "express";
import {
  getAllVariants,
  getVariantById,
  createVariant,
  updateVariantById,
  deleteVariantById,
  getVariantByCakeId,
} from "../../controller/variants.controller.js";

import { adminAuthorization } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllVariants);
router.post("/", adminAuthorization, createVariant);
router.get("/:ID", getVariantById);
router.get("/cake/:cake_id", getVariantByCakeId);
router.put("/:ID", adminAuthorization, updateVariantById);
router.delete("/:ID", adminAuthorization, deleteVariantById);

export default router;
