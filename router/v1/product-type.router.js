import { Router } from "express";
import {
  createProductType,
  deleteProductTypeById,
  getProductTypeById,
  getAllProductType,
  updateProductTypeById,
} from "../../controller/product-type.controller.js";

const router = Router();

router.get("/", getAllProductType);
router.post("/", createProductType);
router.get("/:ID", getProductTypeById);
router.put("/:ID", updateProductTypeById);
router.delete("/:ID", deleteProductTypeById);

export default router;
