import UserDao from "../dao/users.dao.js";
import UserService from "../service/users.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const userDao = new UserDao(db);

  try {
    const userService = new UserService(userDao);
    const result = await serviceFunction(userService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  handleRequest(req, res, next, async (userService, req) => {
    const result = await userService.getAllUser();
    return result;
  });
}

async function getUserById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (userService, req) => {
    const result = await userService.getUserById({ ID });
    return result;
  });
}

async function getUserProfileByToken(req, res, next) {
  const { token } = req.body;
  handleRequest(req, res, next, async (userService, req) => {
    const result = await userService.getUserProfileByToken({ token });
    return result;
  });
}

async function updateUserById(req, res, next) {
  const { ID } = req.params;
  const { username, email, password, avatar } = req.body;
  handleRequest(req, res, next, async (userService, req) => {
    const result = await userService.updateUserById({
      ID,
      username,
      password,
      email,
      avatar,
    });
    return result;
  });
}

async function updateRoleById(req, res, next) {
  const { ID, role_id } = req.body;
  handleRequest(req, res, next, async (userService, req) => {
    const result = await userService.updateRole({ ID, role_id });
    return result;
  });
}

async function deleteUserById(req, res, next) {
  const { ID } = req.params;
  handleRequest(req, res, next, async (userService, req) => {
    const result = await userService.deleteUserById({ ID });
    return result;
  });
}

export {
  getAllUsers,
  getUserById,
  getUserProfileByToken,
  updateUserById,
  updateRoleById,
  deleteUserById,
};
