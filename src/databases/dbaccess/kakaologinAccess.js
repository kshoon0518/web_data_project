import { prisma } from "./";

const kakaologinAccess = {
  async kakaouserCreate(kakaouserInfo) {
    const newkakaoUser = await prisma.user.create({ data: kakaouserInfo });
    return newkakaoUser ? true : false;
  },
};

export { kakaologinAccess };
