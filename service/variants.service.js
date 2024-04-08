import StandardError from "../utils/http-errors/standard-error.js";

class VariantService {
  constructor(variantDao) {
    this.variantDao = variantDao;
  }

  async getAllVariants() {
    try {
      const variants = await this.variantDao.getAllVariants();

      if (!variants || variants.length === 0) {
        throw new StandardError({
          success: false,
          message: "No variant found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "List of all variants",
        data: variants,
      };
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
      const variant = await this.variantDao.getVariantById({ ID });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Variant not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Variant found.",
        data: variant,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createVariant({ cake_id, name, price }) {
    try {
      const variant = await this.variantDao.createVariant({
        cake_id,
        name,
        price,
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Failed to create variant. Please try again.",
          status: 500,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Variant created.",
        data: variant,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateVariantById({ ID, cake_id, name, price }) {
    try {
      const variant = await this.variantDao.updateVariantById({
        ID,
        cake_id,
        name,
        price,
      });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Variant not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Variant updated.",
        data: variant,
      };
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
      const variant = await this.variantDao.deleteVariantById({ ID });

      if (!variant) {
        throw new StandardError({
          success: false,
          message: "Variant not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Variant deleted.",
        data: variant,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default VariantService;
