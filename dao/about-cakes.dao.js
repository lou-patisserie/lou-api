import StandardError from "../utils/http-errors/standard-error.js";
import { PrismaClient } from "@prisma/client";
import { generateJakartaDate } from "../utils/helpers/jakarta-time.js";

class AboutCakesDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllAboutCake() {
    try {
      const aboutCake = await this.prisma.aboutCakes.findMany({
        include: {
          Cakes: true,
        },
      });

      return aboutCake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createAboutCake({
    cake_id,
    desc,
    allergen,
    ingredients,
    storage_serving,
  }) {
    try {
      const aboutCake = await this.prisma.aboutCakes.create({
        data: {
          cake_id,
          desc,
          allergen,
          ingredients,
          storage_serving,
          created_date: generateJakartaDate(),
        },
      });

      return aboutCake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAboutCakeById({ ID }) {
    try {
      const aboutCake = await this.prisma.aboutCakes.findUnique({
        where: {
          ID,
        },
        include: {
          Cakes: true,
        },
      });

      return aboutCake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAboutCakeByCakeId({ cake_id }) {
    try {
      const aboutCake = await this.prisma.aboutCakes.findFirst({
        where: {
          cake_id,
        },
        include: {
          Cakes: true,
        },
      });

      return aboutCake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateAboutCakeById({
    ID,
    cake_id,
    desc,
    allergen,
    ingredients,
    storage_serving,
  }) {
    try {
      const aboutCake = await this.prisma.aboutCakes.update({
        where: {
          ID,
        },
        data: {
          cake_id,
          desc,
          allergen,
          ingredients,
          storage_serving,
        },
      });

      return aboutCake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteAboutCakeById({ ID }) {
    try {
      const aboutCake = await this.prisma.aboutCakes.delete({
        where: {
          ID,
        },
      });

      if (!aboutCake) {
        throw new StandardError({
          success: false,
          message: "About cake not found",
          status: 404,
        });
      }

      return aboutCake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default AboutCakesDao;
