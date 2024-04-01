import StandardError from "../utils/http-errors/standard-error";
import bcrypt from "bcrypt";

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUser() {
    try {
      const user = await this.userDao.getListUser();
      if (!user) {
        throw new StandardError({
          success: false,
          message: "No user found.",
          status: 404,
        });
      } else {
        return {
          status: 200,
          success: true,
          message: "List of all user",
          data: user,
        };
      }
    } catch (err) {
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async updateRole({ id, role }) {
    try {
      const allowedRoles = ["admin", "member"];
      if (!allowedRoles.includes(role)) {
        throw new StandardError({
          status: 400,
          message: "Failed to update role. Invalid role specified",
        });
      }

      const user = await this.userDao.updateRole({ id, role });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
          status: 404,
        });
      }
      return {
        status: 200,
        success: true,
        message: "Successfully update user role",
        data: user,
      };
    } catch (err) {
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async getUserProfileByToken({ token }) {
    try {
      const user = await this.userDao.getUserProfileByToken({ token });
      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
          status: 404,
        });
      }
      return {
        status: 200,
        success: true,
        message: "User profile data",
        data: user,
      };
    } catch (err) {
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async updateUser({ id, username, email, avatar, password }) {
    try {
      if (!username || !password) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }

      if (username.trim().length === 0 || username.length <= 6) {
        throw new StandardError({
          success: false,
          message:
            "Username should have minimum 6 characters and cannot be blank. Please try again.",
          status: 400,
        });
      }

      if (password.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userDao.updateUser({
          id,
          username,
          email,
          avatar,
          password: hashedPassword,
        });
        if (!user) {
          throw new StandardError({
            success: false,
            message: "User not found.",
            status: 404,
          });
        }
        return {
          status: 200,
          success: true,
          message: "Successfully update user",
          data: user,
        };
      } else {
        throw new StandardError({
          success: false,
          message:
            "Password should be at least 8 characters and contain number. Please try again.",
          status: 400,
        });
      }
    } catch (err) {
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = UserService;
