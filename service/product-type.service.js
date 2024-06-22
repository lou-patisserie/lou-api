import StandardError from "../utils/http-errors/standard-error.js";

class ProductTypeService {
  constructor(productTypeDao) {
    this.productTypeDao = productTypeDao;
  }

  async getAllProductType({ order, sort }) {
    try {
      const productTypes = await this.productTypeDao.getAllProductType({
        order,
        sort,
      });

      if (!productTypes || productTypes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No product type found.",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: "List of all product types",
        data: productTypes,
      };
    } catch (error) {
      console.log("error :", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getProductTypeById({ ID }) {
    try {
      const productType = await this.productTypeDao.getProductTypeById({ ID });

      if (!productType) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: "Product type found.",
        data: productType,
      };
    } catch (error) {
      console.log("error :", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createProductType({ name, order, desc }) {
    try {
      const productType = await this.productTypeDao.createProductType({
        name,
        order,
        desc,
      });

      return {
        status: 200,
        success: true,
        message: "Product type created successfully.",
        data: productType,
      };
    } catch (error) {
      console.log("error :", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateProductTypeById({ ID, order, name }) {
    try {
      const productType = await this.productTypeDao.updateProductTypeById({
        ID,
        name,
        order,
      });

      if (!productType) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: "Product type updated successfully.",
        data: productType,
      };
    } catch (error) {
      console.log("error :", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteProductTypeById({ ID }) {
    try {
      const productType = await this.productTypeDao.deleteProductTypeById({
        ID,
      });

      if (!productType) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: "Product type deleted successfully.",
        data: productType,
      };
    } catch (error) {
      console.log("error :", error);
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default ProductTypeService;
