import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SIGN } from "../config/jwtConfig.js";
import StandardError from "../utils/http-errors/standard-error.js";

class AuthService {
  constructor(authDao) {
    this.authDao = authDao;
  }

  async registerUser({ username, password, email, avatar }) {
    if (!username || !password) {
      throw new StandardError({
        success: false,
        message: "Username and password are required.",
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

    try {
      if (password.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.authDao.registerUser({
          username,
          password: hashedPassword,
          email,
          avatar,
        });
        return {
          success: true,
          message: "Successfully registered a user",
          data: user,
          status: 201,
        };
      } else {
        throw new StandardError({
          success: false,
          message:
            "Password should be at least 8 characters and contain number. Please try again.",
          status: 400,
        });
      }
    } catch (error) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async loginUser({ username, password }) {
    try {
      const user = await this.authDao.findByUsername({ username });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "Username or password is incorrect. Please try again.",
          status: 401,
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new StandardError({
          success: false,
          message: "Username or password is incorrect. Please try again.",
          status: 401,
        });
      }

      const token = jwt.sign(
        {
          ID: user.ID,
          username: user.username,
          email: user.email,
          role: user.role.name,
        },
        JWT_SIGN,
        { expiresIn: "1h" }
      );

      return {
        status: 200,
        success: true,
        message: "User logged in successfully",
        data: {
          token,
          user: {
            name: user.username,
            role_id: user.role_id,
            role: user.role.name,
          },
        },
      };
    } catch (error) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default AuthService;
