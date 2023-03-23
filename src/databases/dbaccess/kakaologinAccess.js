import { prisma } from "./";

const kakaologinAccess = {
  async kakaoUserFind(kakaoUserId) {
    const existingUser = await prisma.user.findUnique({
      where: { kakaoId: kakaoUserId },
    });
    return existingUser;
  },
};

export { kakaologinAccess };
