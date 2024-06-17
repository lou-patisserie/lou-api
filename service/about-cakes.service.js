import StandardError from "../utils/http-errors/standard-error.js";

class AboutCakesService {
  constructor(aboutCakesDao) {
    this.aboutCakesDao = aboutCakesDao;
  }

  async getAllAboutCake() {
    try {
      const aboutCake = await this.aboutCakesDao.getAllAboutCake();

      if (!aboutCake || aboutCake.length === 0) {
        throw new StandardError({
          success: false,
          message: "About cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "List all About cake",
        data: aboutCake,
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

  async getAboutCakeById({ ID }) {
    try {
      const aboutCake = await this.aboutCakesDao.getAboutCakeById({ ID });

      if (!aboutCake || aboutCake.length === 0) {
        throw new StandardError({
          success: false,
          message: "About cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "About cake by id",
        data: aboutCake,
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

  async getAboutCakeByCakeId({ cakeID }) {
    try {
      const aboutCake = await this.aboutCakesDao.getAboutCakeByCakeId({
        cakeID,
      });

      if (!aboutCake || aboutCake.length === 0) {
        throw new StandardError({
          success: false,
          message: "About cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "About cake by cake id",
        data: aboutCake,
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

  async createAboutCake({
    cake_id,
    desc,
    allergen,
    ingredients,
    storage_serving,
  }) {
    try {
      const aboutCake = await this.aboutCakesDao.createAboutCake({
        cake_id,
        desc,
        allergen,
        ingredients,
        storage_serving,
      });

      return {
        success: true,
        status: 201,
        message: "About cake created",
        data: aboutCake,
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

  async updateAboutCakeById({
    ID,
    cake_id,
    desc,
    allergen,
    ingredients,
    storage_serving,
  }) {
    try {
      const aboutCake = await this.aboutCakesDao.updateAboutCakeById({
        ID,
        cake_id,
        desc,
        allergen,
        ingredients,
        storage_serving,
      });

      return {
        success: true,
        status: 200,
        message: "About cake updated",
        data: aboutCake,
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

  async deleteAboutCakeById({ ID }) {
    try {
      const aboutCake = await this.aboutCakesDao.deleteAboutCakeById({ ID });

      if (!aboutCake || aboutCake.length === 0) {
        throw new StandardError({
          success: false,
          message: "About cake not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "About cake deleted",
        data: aboutCake,
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

export default AboutCakesService;
