import { prisma } from "./";

const wishAccess = {
  // station_id를 기준으로 검색
  async wishStationFindMany(findInfo) {
    const foundWishList = await prisma.wishList.findMany({
      where: {
        station: {
          id: findInfo.station_id,
        },
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

  async findWish(info) {
    const wish = await prisma.wishList.findMany({ where: info });
    return wish[0];
  },

  // user_id, station_id를 기준으로 검색
  async wishUserFindMany(findInfo) {
    const foundWishList = await prisma.wishList.findMany({
      where: {
        station: {
          id: findInfo.station_id,
        },
        user: {
          id: findInfo.user_id,
        },
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

  // user_id를 기준으로 검색
  async wishUserOnlyFindMany(findInfo) {
    const foundWishList = await prisma.wishList.findMany({
      where: {
        user: {
          id: findInfo,
        },
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

  // 찜 내역 생성
  async wishCreate(wishInfo) {
    const newWish = await prisma.wishList.createMany({
      data: {
        user_id: wishInfo.userId,
        station_id: wishInfo.stationId,
      },
      skipDuplicates: true,
    });

    // 생성한 찜 내역 반환
    return newWish;
  },

  // id 값 기준으로 찜 내역 삭제
  async wishDelete(wishId) {
    const deleteCnt = await prisma.wishList.deleteMany({
      where: { id: wishId },
    });

    return deleteCnt;
  },
};

export { wishAccess };
