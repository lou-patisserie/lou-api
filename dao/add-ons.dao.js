import StandardError from "../utils/http-errors/standard-error.js";
import { PrismaClient } from "@prisma/client";
import { generateJakartaDate } from "../utils/helpers/jakarta-time.js";

class AddOnsDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllAddOns() {
    try {
      const addOns = await this.prisma.addOns.findMany();

      return addOns;
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
      const addOn = await this.prisma.addOns.findUnique({
        where: {
          ID,
        },
      });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return addOn;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAddOnsByName({ name }) {
    try {
      const addOns = await this.prisma.addOns.findFirst({
        where: {
          name,
        },
      });

      if (!addOns || addOns.length === 0) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return addOns;
    } catch (error) {
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
      const addOnExist = await this.prisma.addOns.findFirst({
        where: {
          name,
        },
      });

      if (addOnExist) {
        throw new StandardError({
          success: false,
          message: "Add-on name already exist.",
          status: 400,
        });
      }

      const addOn = await this.prisma.addOns.create({
        data: {
          user_id,
          name,
          desc,
          price,
          main_image,
          sub_image1,
          sub_image2,
          created_date: generateJakartaDate(),
        },
      });

      return addOn;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAddOnByName({ name }) {
    try {
      const addOn = await this.prisma.addOns.findUnique({
        where: {
          name,
        },
      });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return addOn;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateAddOnById({
    ID,
    name,
    desc,
    price,
    main_image,
    sub_image1,
    sub_image2,
  }) {
    try {
      
      const addOnExist = await this.prisma.addOns.findFirst({
        where: {
          name,
        },
      });

      if (addOnExist) {
        throw new StandardError({
          success: false,
          message: "Add-on name already exist.",
          status: 400,
        });
      }

      const addOn = await this.prisma.addOns.update({
        where: {
          ID,
        },
        data: {
          name,
          desc,
          price,
          main_image,
          sub_image1,
          sub_image2,
        },
      });

      return addOn;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteAddOnById({ ID }) {
    try {
      const addOn = await this.prisma.addOns.delete({
        where: {
          ID,
        },
      });

      if (!addOn) {
        throw new StandardError({
          success: false,
          message: "Add-on not found.",
          status: 404,
        });
      }

      return addOn;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default AddOnsDao;
