import { Prisma } from "@prisma/client";

// Has to implemented

export const DBError = async (func: Function) => {
  try {
    await func();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return e;
    }
  }
};
