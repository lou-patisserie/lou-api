import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  prisma
    .$connect()
    .then(() => {
      console.log("PrismaClient Database connected successfully");
    })
    .catch((error) => {
      console.error("Error connecting PrismaClient Database:", error);
    });

  return prisma;
};

const globalThis = typeof window !== "undefined" ? window : global;

const dbConn = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = dbConn;
}

export default dbConn;
