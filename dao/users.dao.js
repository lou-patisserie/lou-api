import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/http-errors/standard-error.js";

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

  async updateUserById({ ID, username, email, password, avatar }) {
    try {
      const user = await this.prisma.users.update({
        where: {
          ID,
        },
        data: {
          username,
          email,
          password,
          avatar,
        },
      });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
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

  async getUserByUsername({ username }) {
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

  async getUserById({ ID }) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          ID,
        },
      });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
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

  async deleteUserById({ ID }) {
    try {
      const user = await this.prisma.users.delete({
        where: {
          ID,
        },
      });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
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
}

export default UserDao;
