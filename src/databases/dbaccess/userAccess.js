import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userAccess = {
  async userCreate(userInfo) {
    const newUser = await prisma.user.create({ data: userInfo });
    return newUser;
  },

  async userFindOneByEmail(user_email) {
    const user = await prisma.user.findUnique({ where: { email: user_email } });
    return user;
  },
};

export { userAccess };
