import { prisma } from "./";

const kakaologinAccess = {
  async kakaouserCreate(kakaouserInfo) {
    const findkakaoUser = await prisma.user.findOne({
      where: { kakaouserInfo },
    });
    return findkakaoUser ? true : false;
  },
};

export { kakaologinAccess };
