import StandardError from "../utils/http-errors/standard-error.js";

class AddOnsService {
  constructor(AddOnsDao) {
    this.AddOnsDao = AddOnsDao;
  }

  async getAllAddOns() {
    try {
      const addOns = await this.AddOnsDao.getAllAddOns();

      if (!addOns || addOns.length === 0) {
        throw new StandardError({
          success: false,
          message: "No add-on found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "List of all add-ons",
        data: addOns,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAddOnById({ ID }) {
    try {
      const addOn = await this.AddOnsDao.getAddOnById({ ID });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Add-on found.",
        data: addOn,
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

  async createAddOns({
    user_id,
    name,
    desc,
    price,
    main_image,
    sub_image1,
    sub_image2,
  }) {
    try {
      const addOn = await this.AddOnsDao.createAddOns({
        user_id,
        name,
        desc,
        price,
        main_image,
        sub_image1,
        sub_image2,
      });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not created.",
          status: 400,
        });
      }

      return {
        success: true,
        status: 201,
        message: "Add-on created.",
        data: addOn,
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

  async getAddOnsByName({ name }) {
    try {
      const addOns = await this.AddOnsDao.getAddOnsByName({ name });

      if (!addOns || addOns.length === 0) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Add-on found.",
        data: addOns,
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

  async updateAddOnById({
    ID,
    user_id,
    name,
    desc,
    price,
    main_image,
    sub_image1,
    sub_image2,
  }) {
    try {
      const addOn = await this.AddOnsDao.updateAddOnById({
        ID,
        user_id,
        name,
        desc,
        price,
        main_image,
        sub_image1,
        sub_image2,
      });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Add-on updated.",
        data: addOn,
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

  async deleteAddOnById({ ID }) {
    try {
      const addOn = await this.AddOnsDao.deleteAddOnById({ ID });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return {
        success: true,
        status: 200,
        message: "Add-on deleted.",
        data: addOn,
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

export default AddOnsService;
