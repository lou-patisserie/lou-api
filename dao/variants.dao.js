import StandardError from "../utils/http-errors/standard-error.js";
import { PrismaClient } from "@prisma/client";
import { generateJakartaDate } from "../utils/helpers/jakarta-time.js";

class VariantDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllVariants() {
    try {
      const variants = await this.prisma.cakeVariants.findMany({
        include: {
          Cakes: true,
        },
      });

      return variants;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getVariantById({ ID }) {
    try {
      const variant = await this.prisma.cakeVariants.findUnique({
        where: {
          ID,
        },
        include: {
          Cakes: true,
        },
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Variant not found.",
          status: 404,
        });
      }

      return variant;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getVariantByCakeId({ cake_id }) {
    try {
      const variant = await this.prisma.cakeVariants.findFirst({
        where: {
          cake_id,
        },
        include: {
          Cakes: true,
        },
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Variant not found.",
          status: 404,
        });
      }

      return variant;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createVariant({ cake_id, name, price, desc }) {
    try {
      const variant = await this.prisma.cakeVariants.create({
        data: {
          cake_id,
          name,
          desc,
          price,
          created_date: generateJakartaDate(),
        },
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Failed to create variant. Please try again.",
          status: 500,
        });
      }

      return variant;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateVariantById({ ID, cake_id, name, desc, price }) {
    try {
      const variant = await this.prisma.cakeVariants.update({
        where: {
          ID,
        },
        data: {
          cake_id,
          name,
          desc,
          price,
        },
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Failed to update variant. Please try again.",
          status: 500,
        });
      }

      return variant;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteVariantById({ ID }) {
    try {
      const variant = await this.prisma.cakeVariants.delete({
        where: {
          ID,
        },
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Failed to delete variant. Please try again.",
          status: 500,
        });
      }

      return variant;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default VariantDao;
