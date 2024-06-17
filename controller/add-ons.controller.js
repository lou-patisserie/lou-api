import AddOnsDao from "../dao/add-ons.dao.js";
import AddOnsService from "../service/add-ons.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const addOnsDao = new AddOnsDao(db);

  try {
    const addOnsService = new AddOnsService(addOnsDao);
    const result = await serviceFunction(addOnsService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function getAllAddOns(req, res, next) {
  handleRequest(req, res, next, async (addOnsService, req) => {
    const result = await addOnsService.getAllAddOns();
    return result;
  });
}

async function createAddOns(req, res, next) {
  const { user_id, name, desc, price, main_image, sub_image1, sub_image2 } =
    req.body;
  handleRequest(req, res, next, async (addOnsService, req) => {
    const result = await addOnsService.createAddOns({
      user_id,
      name,
      desc,
      price,
      main_image,
      sub_image1,
      sub_image2,
    });
    return result;
  });
}

async function updateAddOnById(req, res, next) {
  const { ID } = req.params;
  const { name, desc, price, main_image, sub_image1, sub_image2 } = req.body;
  handleRequest(req, res, next, async (addOnsService, req) => {
    const result = await addOnsService.updateAddOnById({
      ID,
      name,
      desc,
      price,
      main_image,
      sub_image1,
      sub_image2,
    });
    return result;
  });
}

async function deleteAddOnById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (addOnsService, req) => {
    const result = await addOnsService.deleteAddOnById({ ID });
    return result;
  });
}

export {
  getAllAddOns,
  createAddOns,
  updateAddOnById,
  deleteAddOnById,
};
