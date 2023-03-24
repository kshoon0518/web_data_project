import { prisma } from "./";

const userAccess = {
  async userCreate(userInfo) {
    const newUser = await prisma.user.create({ data: userInfo });
    return newUser;
  },

  async userFindOneByEmail(userEmail) {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    return user;
  },

  async userFindOneByNickname(userNickname) {
    const user = await prisma.user.findUnique({
      where: { nickname: userNickname },
    });
    return user;
  },

  async userFindOneById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        isAdmin: true,
        email: true,
        name: true,
        nickname: true,
        kakaoId: true,
      },
    });
    return user;
  },

  async userFindPasswordById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        password: true,
      },
    });
    return user.password;
  },

  async userUpdate(userId, userInfo) {
    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: userInfo,
    });
    return userUpdate ? true : false;
  },

  async userDeleteById(userId) {
    const userDeletion = await prisma.user.update({
      where: { id: userId },
      data: { nickname: null, kakaoId: null, deletedAt: new Date() },
    });
  },
};

export { userAccess };
