import StandardError from "../utils/http-errors/standard-error.js";
import { convertToBoolean } from "../utils/helpers/convert-boolean.js";
import { convertToInteger } from "../utils/helpers/convert-integer.js";

class CakesService {
  constructor(cakesDao) {
    this.cakesDao = cakesDao;
  }

  async getAllCakes() {
    try {
      const cakes = await this.cakesDao.getAllCakes();

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cakes found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "List of all cakes",
        data: cakes,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createCake({
    user_id,
    product_type_id,
    name,
    is_best_seller,
    is_new_arrival,
    is_fruit_based,
    is_nut_free,
    is_chocolate_based,
    main_image,
    sub_image1,
    sub_image2,
  }) {
    try {
      const isProductTypeExist = await this.cakesDao.getProductTypeById({
        product_type_id,
      });

      const isUserExist = await this.cakesDao.getUserById({ user_id });

      if (!isProductTypeExist) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      if (!isUserExist) {
        throw new StandardError({
          success: false,
          message: "User not found.",
          status: 404,
        });
      }

      const cake = await this.cakesDao.createCake({
        user_id,
        product_type_id,
        name,
        is_best_seller,
        is_new_arrival,
        is_fruit_based,
        is_nut_free,
        is_chocolate_based,
        main_image,
        sub_image1,
        sub_image2,
      });

      return {
        success: true,
        status: 200,
        message: "Cake created successfully.",
        data: cake,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakeByName({ name }) {
    try {
      const cake = await this.cakesDao.getCakeByName({ name });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Cake found.",
        data: cake,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakeById({ ID }) {
    try {
      const cake = await this.cakesDao.getCakeById({ ID });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Cake found.",
        data: cake,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async flexSearchCakes({ search }) {
    try {
      const cakes = await this.cakesDao.flexSearchCakes({ search });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cakes found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "List of all cakes",
        data: cakes,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakesByFlexOptions({
    name,
    typeID,
    bestSeller,
    newArrival,
    fruitBased,
    nutFree,
    chocolateBased,
    sort,
    limit,
    page,
  }) {
    bestSeller = convertToBoolean(bestSeller);
    newArrival = convertToBoolean(newArrival);
    fruitBased = convertToBoolean(fruitBased);
    nutFree = convertToBoolean(nutFree);
    chocolateBased = convertToBoolean(chocolateBased);
    limit = convertToInteger(limit);
    page = convertToInteger(page);

    try {
      const { cakes, currentPage, totalPage, totalCurrentData, totalAllData } =
        await this.cakesDao.getCakesByFlexOptions({
          name,
          typeID,
          bestSeller,
          newArrival,
          fruitBased,
          nutFree,
          chocolateBased,
          sort,
          limit,
          page,
        });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cakes found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Get cakes by Flex options",
        data: {
          currentPage,
          totalPage,
          totalCurrentData,
          totalAllData,
          cakes,
        },
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateCakeById({
    ID,
    product_type_id,
    name,
    is_best_seller,
    is_new_arrival,
    is_fruit_based,
    is_nut_free,
    is_chocolate_based,
    main_image,
    sub_image1,
    sub_image2,
  }) {
    try {
      const isProductTypeExist = await this.cakesDao.getProductTypeById({
        product_type_id,
      });

      if (!isProductTypeExist) {
        throw new StandardError({
          success: false,
          message: "Product type not found.",
          status: 404,
        });
      }

      const cake = await this.cakesDao.updateCakeById({
        ID,
        product_type_id,
        name,
        is_best_seller,
        is_new_arrival,
        is_fruit_based,
        is_nut_free,
        is_chocolate_based,
        main_image,
        sub_image1,
        sub_image2,
      });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Cake updated successfully.",
        data: cake,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteCakeById({ ID }) {
    try {
      const cake = await this.cakesDao.deleteCakeById({ ID });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Cake deleted successfully.",
        data: cake,
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

export default CakesService;
