import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserProfileByToken,
  updateUserById,
  updateRoleById,
  deleteUserById,
} from "../../controller/users.controller.js";
import {
  userAuthentication,
  adminAuthorization,
  managerAuthorization,
} from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", adminAuthorization, getAllUsers);
router.get("/profile", userAuthentication, getUserProfileByToken);
router.get("/:ID", userAuthentication, getUserById);
router.put("/:ID", userAuthentication, updateUserById);
router.put("/role/:ID", managerAuthorization, updateRoleById);
router.delete("/:ID", adminAuthorization, deleteUserById);

export default router;
