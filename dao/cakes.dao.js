import StandardError from "../utils/http-errors/standard-error.js";
import { PrismaClient } from "@prisma/client";
import { generateJakartaDate } from "../utils/helpers/jakarta-time.js";

class CakesDao {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCakes() {
    try {
      const cakes = await this.prisma.cakes.findMany({
        include: {
          ProductType: true,
          Users: true,
        },
      });

      return cakes;
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
      const cakes = await this.prisma.cakes.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          ProductType: true,
          Users: true,
        },
      });

      return cakes;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async flexGetCakesByType({ type }) {
    try {
      const cakes = await this.prisma.cakes.findMany({
        where: {
          product_type_id: type,
        },
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      return cakes;
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
    const query = {
      product_type_id: typeID,
      is_best_seller: bestSeller,
      is_new_arrival: newArrival,
      is_fruit_based: fruitBased,
      is_nut_free: nutFree,
      is_chocolate_based: chocolateBased,
    };

    const searchQuery = {
      OR: [
        {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      ],
    };

    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key]
    );

    try {
      limit = limit ? parseInt(limit) : 6;
      page = page ? parseInt(page) : 1;

      const totalCount = await this.prisma.cakes.count({
        where: {
          AND: [query, searchQuery],
        },
      });

      const calculatedOffset = (page - 1) * limit;

      const cakes = await this.prisma.cakes.findMany({
        where: {
          AND: [query, searchQuery],
        },
        orderBy: {
          created_date: sort,
        },
        include: {
          ProductType: true,
        },
        skip: page ? calculatedOffset : 0,
        take: limit ? limit : 6,
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      const currentPage = page || 1;
      const totalPage = Math.ceil(totalCount / (limit || 6));

      const totalCurrentData = cakes.length || 0;
      const totalAllData = totalCount || 0;

      return {
        cakes,
        currentPage,
        totalPage,
        totalCurrentData,
        totalAllData,
      };
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakesSortedByDate({ sort }) {
    try {
      const cakes = await this.prisma.cakes.findMany({
        orderBy: {
          created_date: sort,
        },
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      return cakes;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakesByIsNutFree({ is_option }) {
    try {
      const cakes = await this.prisma.cakes.findMany({
        where: {
          is_nut_free: is_option,
        },
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      return cakes;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakesByIsFruitBased({ is_option }) {
    try {
      const cakes = await this.prisma.cakes.findMany({
        where: {
          is_fruit_based: is_option,
        },
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      return cakes;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakesByChocolateBased({ is_option }) {
    try {
      const cakes = await this.prisma.cakes.findMany({
        where: {
          is_chocolate_based: is_option,
        },
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      return cakes;
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
      const cake = await this.prisma.cakes.findFirst({
        where: {
          name,
        },
      });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return cake;
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
      const cake = await this.prisma.cakes.findUnique({
        where: {
          ID,
        },
        include: {
          ProductType: true,
          Users: true,
        },
      });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return cake;
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
    variant_name_1,
    variant_desc_1,
    variant_price_1,
    variant_name_2,
    variant_desc_2,
    variant_price_2,
    main_image,
    sub_image1,
    sub_image2,
  }) {
    try {
      const cake = await this.prisma.cakes.create({
        data: {
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
          created_date: generateJakartaDate(),
        },
      });

      const variant = await this.prisma.cakeVariants.createMany({
        data: [
          {
            cake_id: cake.ID,
            name: variant_name_1,
            desc: variant_desc_1,
            price: variant_price_1,
            created_date: generateJakartaDate(),
          },
          {
            cake_id: cake.ID,
            name: variant_name_2,
            desc: variant_desc_2,
            price: variant_price_2,
            created_date: generateJakartaDate(),
          },
        ],
      });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Failed to create cake. Please try again.",
          status: 500,
        });
      }

      return {
        cake: cake,
        variant: variant,
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
    variant_name_1,
    variant_desc_1,
    variant_price_1,
    variant_name_2,
    variant_desc_2,
    variant_price_2,
    sub_image1,
    sub_image2,
  }) {
    try {
      const cake = await this.prisma.cakes.update({
        where: {
          ID,
        },
        data: {
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
        },
      });

      await this.prisma.cakeVariants.deleteMany({
        where: { cake_id: ID },
      });

      const variants = await this.prisma.cakeVariants.createMany({
        data: [
          {
            cake_id: cake.ID,
            name: variant_name_1,
            desc: variant_desc_1,
            price: variant_price_1,
            created_date: generateJakartaDate(),
          },
          {
            cake_id: cake.ID,
            name: variant_name_2,
            desc: variant_desc_2,
            price: variant_price_2,
            created_date: generateJakartaDate(),
          },
        ],
      });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return { cake, variants };
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
      const cake = await this.prisma.cakes.delete({
        where: {
          ID,
        },
      });

      if (!cake) {
        throw new StandardError({
          success: false,
          message: "Cake not found.",
          status: 404,
        });
      }

      return cake;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCakesByTypeId({ ID }) {
    try {
      const cakes = await this.prisma.cakes.findMany({
        where: {
          product_type_id: ID,
        },
      });

      if (!cakes || cakes.length === 0) {
        throw new StandardError({
          success: false,
          message: "No cake found.",
          status: 404,
        });
      }

      return cakes;
    } catch (error) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getProductTypeById({ product_type_id }) {
    try {
      const productType = await this.prisma.productType.findUnique({
        where: {
          ID: product_type_id,
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

  async createVariant({ cake_id, name, price }) {
    try {
      const variant = await this.prisma.cakeVariants.create({
        data: {
          cake_id,
          name,
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

  async getVariantByCakeId({ cake_id }) {
    try {
      const variant = await this.prisma.cakeVariants.findMany({
        where: {
          cake_id,
        },
      });

      return variant;
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

  async getUserById({ user_id }) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          ID: user_id,
        },
      });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
          status: 404,
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
}

export default CakesDao;
