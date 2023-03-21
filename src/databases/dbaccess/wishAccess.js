import { prisma } from "./";

const wishAccess = {
  // station_id, user_id, id(wish) 모두를 기준으로 검색할 수 있도록
  async wishStationFindMany(findInfo) {
    const foundWishList = await prisma.wishList.findMany({
      where: { station_id: findInfo.station_id },
      select: {
        id: true,
        station: {
          select: {
            id: true,
            station_name: true,
            station_line: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 검색한 목록 반환
    return foundWishList;
  },

  async wishUserFindMany(findInfo) {
    const foundWishList = await prisma.wishList.findMany({
      where: {
        station_id: findInfo.station_id,
        user_id: findInfo.user_id,
      },
      select: {
        id: true,
        station: {
          select: {
            id: true,
            station_name: true,
            station_line: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 검색한 목록 반환
    return foundWishList;
  },

  async wishUserOnlyFindMany(findInfo) {
    const foundWishList = await prisma.wishList.findMany({
      where: {
        user_id: findInfo.user_id,
      },
      select: {
        id: true,
        station: {
          select: {
            id: true,
            station_name: true,
            station_line: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 검색한 목록 반환
    return foundWishList;
  },

  // 특정 찜 내역을 검색
  async wishFindUnique(wishInfo) {
    const foundUserWish = await prisma.wishList.findUnique({
      where: wishInfo,
      select: {
        id: true,
        station: {
          select: {
            id: true,
            station_name: true,
            station_line: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 검색한 찜 내역 반환
    return foundUserWish;
  },

  // 찜 내역 생성
  async wishCreate(wishInfo) {
    const newWish = await prisma.wishList.create({
      data: {
        user_id: wishInfo.userId,
        station_id: wishInfo.stationId,
      },
    });

    // 생성한 찜 내역 반환
    return newWish;
  },

  // id 값 기준으로 찜 내역 삭제
  async wishDelete(deleteInfo) {
    console.log("deleteInfo: ", deleteInfo);
    await prisma.wishList.deleteMany({ where: deleteInfo });
    console.log("삭제 성공?");

    return;
  },
};

export { wishAccess };
