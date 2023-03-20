import { prisma } from "./";

const wishAccess = {
  // station_id, user_id, id(wish) 모두를 기준으로 검색할 수 있도록
  async wishFindMany(Id) {
    const foundWishList = await prisma.wishList.findMany({
      where: Id,
    });

    // 검색한 목록 반환
    return foundWishList;
  },

  // 사용자의 찜 전체 목록 findMany
  //   async wishFindMany(userId) {
  //     const foundWishList = await prisma.wish.findMany({
  //       where: userId,
  //     });
  //     // 검색한 목록 반환
  //     return foundWishList;
  //   },

  // 특정 찜 내역을 검색
  async wishFindUnique(wishInfo) {
    const foundUserWish = await prisma.wishList.findUnique({
      where: wishInfo,
    });

    // 검색한 찜 내역 반환
    return foundUserWish;
  },

  // 찜 내역 생성
  async wishCreate(wishInfo) {
    const newWish = await prisma.wishList.create({ data: wishInfo });

    // 생성한 찜 내역 반환
    return newWish;
  },

  // id 값 기준으로 찜 내역 삭제
  async wishDelete(id) {
    await prisma.wishList.delete(id);
    return;
  },
};

export { wishAccess };
