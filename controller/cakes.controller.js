import CakesDao from "../dao/cakes.dao.js";
import CakesService from "../service/cakes.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const cakesDao = new CakesDao(db);

  try {
    const cakesService = new CakesService(cakesDao);
    const result = await serviceFunction(cakesService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function getAllCakes(req, res, next) {
  const { sort } = req.query;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.getAllCakes({ sort });
    return result;
  });
}

async function getCakesByFlexOptions(req, res, next) {
  const {
    name,
    typeID,
    bestSeller,
    newArrival,
    fruitBased,
    nutFree,
    chocolateBased,
    sort,
    limit,
    page,
  } = req.query;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.getCakesByFlexOptions({
      name,
      typeID,
      bestSeller,
      newArrival,
      fruitBased,
      nutFree,
      chocolateBased,
      sort,
      limit,
      page,
    });
    return result;
  });
}

async function createCake(req, res, next) {
  const {
    user_id,
    product_type_id,
    name,
    is_best_seller,
    is_new_arrival,
    is_fruit_based,
    is_nut_free,
    is_chocolate_based,
    variant_name_1,
    variant_desc_1,
    variant_price_1,
    variant_name_2,
    variant_desc_2,
    variant_price_2,
    main_image,
    sub_image1,
    sub_image2,
    about_cake_desc,
    allergen_desc,
    ingredients_desc,
    storage_serving_desc,
  } = req.body;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.createCake({
      user_id,
      product_type_id,
      name,
      is_best_seller,
      is_new_arrival,
      is_fruit_based,
      is_nut_free,
      is_chocolate_based,
      variant_name_1,
      variant_desc_1,
      variant_price_1,
      variant_name_2,
      variant_desc_2,
      variant_price_2,
      main_image,
      sub_image1,
      sub_image2,
      about_cake_desc,
      allergen_desc,
      ingredients_desc,
      storage_serving_desc,
    });
    return result;
  });
}

async function getCakeById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.getCakeById({ ID });
    return result;
  });
}

async function getCakeByName(req, res, next) {
  const { name } = req.params;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.getCakeByName({ name });
    return result;
  });
}

async function updateCakeById(req, res, next) {
  const { ID } = req.params;
  const {
    product_type_id,
    name,
    is_best_seller,
    is_new_arrival,
    is_fruit_based,
    is_nut_free,
    is_chocolate_based,
    variant_name_1,
    variant_desc_1,
    variant_price_1,
    variant_name_2,
    variant_desc_2,
    variant_price_2,
    main_image,
    sub_image1,
    sub_image2,
    about_cake_desc,
    allergen_desc,
    ingredients_desc,
    storage_serving_desc,
  } = req.body;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.updateCakeById({
      ID,
      product_type_id,
      name,
      is_best_seller,
      is_new_arrival,
      is_fruit_based,
      is_nut_free,
      is_chocolate_based,
      variant_name_1,
      variant_desc_1,
      variant_price_1,
      variant_name_2,
      variant_desc_2,
      variant_price_2,
      main_image,
      sub_image1,
      sub_image2,
      about_cake_desc,
      allergen_desc,
      ingredients_desc,
      storage_serving_desc,
    });

    return result;
  });
}

async function deleteCakeById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (cakesService, req) => {
    const result = await cakesService.deleteCakeById({ ID });
    return result;
  });
}

export {
  getAllCakes,
  getCakeByName,
  getCakesByFlexOptions,
  createCake,
  getCakeById,
  updateCakeById,
  deleteCakeById,
};
