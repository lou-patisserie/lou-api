import StandardError from "../utils/http-errors/standard-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SIGN } from "../config/jwtConfig.js";

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUser() {
    try {
      const user = await this.userDao.getAllUsers();
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

  async updateRole({ ID, role_id }) {
    try {
      const user = await this.userDao.updateRole({ ID, role_id });

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
      const decodedToken = jwt.verify(token, JWT_SIGN);

      if (!decodedToken || !decodedToken.ID) {
        throw new StandardError({
          success: false,
          message: "Invalid token. Please try again.",
          status: 401,
        });
      }

      const user = await this.userDao.getUserById({
        ID: decodedToken.ID,
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

  async getUserById({ ID }) {
    try {
      const user = await this.userDao.getUserById({ ID });

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
        message: "User found.",
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

  async updateUserById({ ID, username, email, avatar, password }) {
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
        const user = await this.userDao.updateUserById({
          ID,
          username,
          password: hashedPassword,
          email,
          avatar,
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

  async deleteUserById({ ID }) {
    try {
      const user = await this.userDao.deleteUserById({ ID });

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
        message: "Successfully delete user",
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
}

export default UserService;
