import ProductTypeDao from "../dao/product-type.dao.js";
import ProductTypeService from "../service/product-type.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const productTypeDao = new ProductTypeDao(db);

  try {
    const productTypeService = new ProductTypeService(productTypeDao);
    const result = await serviceFunction(productTypeService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function getAllProductType(req, res, next) {
  const { order, sort } = req.query;

  handleRequest(req, res, next, async (productTypeService) => {
    const result = await productTypeService.getAllProductType({ order, sort });
    return result;
  });
}

async function getProductTypeById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (productTypeService, req) => {
    const result = await productTypeService.getProductTypeById({ ID });
    return result;
  });
}

async function createProductType(req, res, next) {
  const { name, order, desc } = req.body;
  handleRequest(req, res, next, async (productTypeService, req) => {
    const result = await productTypeService.createProductType({
      name,
      order,
      desc,
    });
    return result;
  });
}

async function updateProductTypeById(req, res, next) {
  const { ID } = req.params;
  const { name, order, desc } = req.body;
  handleRequest(req, res, next, async (productTypeService, req) => {
    const result = await productTypeService.updateProductTypeById({
      ID,
      name,
      order,
      desc,
    });
    return result;
  });
}

async function deleteProductTypeById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (productTypeService, req) => {
    const result = await productTypeService.deleteProductTypeById({ ID });
    return result;
  });
}

export {
  getAllProductType,
  getProductTypeById,
  createProductType,
  updateProductTypeById,
  deleteProductTypeById,
};
