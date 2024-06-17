import VariantDao from "../dao/variants.dao.js";
import VariantService from "../service/variants.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const variantDao = new VariantDao(db);

  try {
    const variantService = new VariantService(variantDao);
    const result = await serviceFunction(variantService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function getAllVariants(req, res, next) {
  handleRequest(req, res, next, async (variantService, req) => {
    const result = await variantService.getAllVariants();
    return result;
  });
}

async function getVariantById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (variantService, req) => {
    const result = await variantService.getVariantById({ ID });
    return result;
  });
}

async function createVariant(req, res, next) {
  const { cake_id, name, desc, price } = req.body;
  handleRequest(req, res, next, async (variantService, req) => {
    const result = await variantService.createVariant({
      cake_id,
      name,
      desc, 
      price,
    });
    return result;
  });
}

async function updateVariantById(req, res, next) {
  const { ID } = req.params;
  const { cake_id, name, desc, price } = req.body;
  handleRequest(req, res, next, async (variantService, req) => {
    const result = await variantService.updateVariantById({
      ID,
      cake_id,
      name,
      desc, 
      price,
    });
    return result;
  });
}

async function deleteVariantById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (variantService, req) => {
    const result = await variantService.deleteVariantById({ ID });
    return result;
  });
}

async function getVariantByCakeId(req, res, next) {
  const { cake_id } = req.params;
  handleRequest(req, res, next, async (variantService, req) => {
    const result = await variantService.getVariantByCakeId({ cake_id });
    return result;
  });
}

export {
  getAllVariants,
  getVariantById,
  createVariant,
  updateVariantById,
  deleteVariantById,
  getVariantByCakeId,
};
