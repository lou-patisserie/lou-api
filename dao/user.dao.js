import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/http-errors/standard-error";
import jwt from "jsonwebtoken";
import { JWT_SIGN } from "../config/jwtConfig.js";

class UserDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.users.findMany();

      return users;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateUserById(id, { email, password, avatar }) {
    try {
      const user = await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          email,
          password,
          avatar,
        },
      });

      return user;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getUserProfileByToken({ token }) {
    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);

      if (!decodedToken || !decodedToken.id) {
        throw new StandardError({
          success: false,
          message: "Invalid token. Please try again.",
          status: 401,
        });
      }

      const user = await this.prisma.users.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (!user || user === null) {
        throw new StandardError({
          success: false,
          message: "User not found or not exist",
          status: 404,
        });
      }

      return user;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username,
        },
      });

      return user;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteUserById(id) {
    try {
      const user = await this.prisma.users.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default UserDao;
