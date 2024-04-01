import AuthDao from "../dao/auth.dao.js";
import AuthService from "../service/auth.service.js";
import { sendResponse } from "../utils/constant/send-response.js";

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const authDao = new AuthDao(db);

  try {
    const authService = new AuthService(authDao);
    const result = await serviceFunction(authService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  }
}

async function registerUser(req, res, next) {
  const { username, password, email, avatar } = req.body;
  handleRequest(req, res, next, async (authService, req) => {
    const result = await authService.registerUser({
      username,
      password,
      email,
      avatar,
    });
    return result;
  });
}

async function loginUser(req, res, next) {
  const { username, password } = req.body;
  handleRequest(req, res, next, async (authService, req) => {
    const result = await authService.loginUser({ username, password });
    return result;
  });
}

export { registerUser, loginUser };
