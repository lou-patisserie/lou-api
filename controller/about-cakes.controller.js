import AboutCakesDao from "../dao/about-cakes.dao.js";
import AboutCakesService from "../service/about-cakes.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const aboutCakesDao = new AboutCakesDao(db);

  try {
    const aboutCakesService = new AboutCakesService(aboutCakesDao);
    const result = await serviceFunction(aboutCakesService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function getAllAboutCake(req, res, next) {
  handleRequest(req, res, next, async (aboutCakesService, req) => {
    const result = await aboutCakesService.getAllAboutCake();
    return result;
  });
}

async function getAboutCakeById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (aboutCakesService, req) => {
    const result = await aboutCakesService.getAboutCakeById({ ID });
    return result;
  });
}

async function createAboutCake(req, res, next) {
  const { cake_id, desc, allergen, ingredients, storage_serving } = req.body;
  handleRequest(req, res, next, async (aboutCakesService, req) => {
    const result = await aboutCakesService.createAboutCake({
      cake_id,
      desc,
      allergen,
      ingredients,
      storage_serving,
    });
    return result;
  });
}

async function updateAboutCakeById(req, res, next) {
  const { ID } = req.params;
  const { cake_id, desc, allergen, ingredients, storage_serving } = req.body;
  handleRequest(req, res, next, async (aboutCakesService, req) => {
    const result = await aboutCakesService.updateAboutCakeById({
      ID,
      cake_id,
      desc,
      allergen,
      ingredients,
      storage_serving,
    });
    return result;
  });
}

async function deleteAboutCakeById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (aboutCakesService, req) => {
    const result = await aboutCakesService.deleteAboutCakeById({ ID });
    return result;
  });
}

async function getAboutCakeByCakeId(req, res, next) {
  const { cake_id } = req.params;
  handleRequest(req, res, next, async (aboutCakesService, req) => {
    const result = await aboutCakesService.getAboutCakeByCakeId({ cake_id });
    return result;
  });
}

export {
  getAllAboutCake,
  getAboutCakeById,
  createAboutCake,
  updateAboutCakeById,
  deleteAboutCakeById,
  getAboutCakeByCakeId,
};
