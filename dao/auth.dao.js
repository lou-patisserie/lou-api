import { generateJakartaDate } from "../utils/helpers/jakarta-time.js";
import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/http-errors/standard-error.js";

class AuthDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerUser({ username, password, email, avatar }) {
    try {
      const isUserTaken = await this.prisma.users.findUnique({
        where: {
          username,
        },
      });

      const isEmailTaken = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (isUserTaken || isEmailTaken) {
        throw new StandardError({
          success: false,
          message: `the username or email is not available. Please try another`,
          status: 400,
        });
      }

      const user = await this.prisma.users.create({
        data: {
          username,
          email,
          password,
          avatar,
          created_date: generateJakartaDate(),
        },
      });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "Failed to create user. Please try again.",
          status: 500,
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

  async findByUsername({ username }) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username,
        },
        include: {
          role: true,
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

export default AuthDao;
