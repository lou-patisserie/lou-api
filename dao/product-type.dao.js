import { generateJakartaDate } from "../utils/helpers/jakarta-time.js";
import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/http-errors/standard-error.js";

class ProductTypeDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllProductType() {
    try {
      const productType = await this.prisma.productType.findMany();

      return productType;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getProductTypeById({ ID }) {
    try {
      const productType = await this.prisma.productType.findUnique({
        where: {
          ID,
        },
      });

      if (!productType) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      return productType;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createProductType({ name, desc }) {
    try {
      const isProductTypeExist = await this.prisma.productType.findFirst({
        where: {
          name,
        },
      });

      if (isProductTypeExist) {
        throw new StandardError({
          success: false,
          message: "Product type already exist.",
          status: 400,
        });
      }

      const productType = await this.prisma.productType.create({
        data: {
          name,
          desc,
          created_date: generateJakartaDate(),
        },
      });

      return productType;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateProductTypeById({ ID, name, desc }) {
    try {
      const productType = await this.prisma.productType.update({
        where: {
          ID,
        },
        data: {
          name,
          desc
        },
      });

      if (!productType) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      return productType;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteProductTypeById({ ID }) {
    try {
      const productType = await this.prisma.productType.delete({
        where: {
          ID,
        },
      });

      if (!productType) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      return productType;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default ProductTypeDao;
