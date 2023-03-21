import { wishAccess } from "../databases/dbaccess";

const wishService = {
  // user의 찜 내역을 검색 서비스
  async findWishList(userId) {
    console.log("user_id : ", userId);

    // db엑세스로 찜을 검색할 유저의 id를 전달
    const foundWishList = await wishAccess.wishUserOnlyFindMany(userId);
    if (foundWishList[0] == null) {
      return { message: "사용자의 찜 내역이 없습니다." };
    }
    console.log("검색된 wishList : ", foundWishList);

    // 검색한 유저의 찜 목록을 반환
    return foundWishList;
  },

  // 지하철 역의 찜 갯수를 확인 서비스 및
  // 로그인 상태의 유저가 찜한 내역도 반환
  async findStationWishCountWithWishId(wishInfo) {
    // user_id 와 station_id가 담긴 wishInfo
    console.log("wishInfo : ", wishInfo);

    // station_id를 이용해 특정 지하철의 찜 목록을 검색
    const foundStationWishList = await wishAccess.wishStationFindMany({
      station_id: wishInfo.station_id,
    });
    // 특정 지하철의 찜 목록 갯수
    const stationWishCount = foundStationWishList.length;

    // 특정 유저와 지하철의 찜 현황 확인
    const foundUserWish = await wishAccess.wishUserFindMany(wishInfo);
    console.log(foundUserWish.length);
    const wish_id = "";
    if (foundUserWish.length !== 0) {
      wish_id = foundUserWish[0].id;
    }
    return { stationWishCount, wish_id };
  },

  async findStationWishCount(stationId) {
    console.log("station_id : ", stationId);

    const foundStationWishList = await wishAccess.wishStationFindMany({
      station_id: stationId,
    });
    const stationWishCount = Object.keys(foundStationWishList).length;

    // 해당 역 찜 목록의 전체 갯수 반환
    return stationWishCount;
  },

  // 사용자와 해당 역에 대한 찜 내역 생성
  async createWish(wishInfo) {
    console.log("wishInfo : ", wishInfo);

    const newWish = await wishAccess.wishCreate(wishInfo);

    // 생성한 찜 내역 반환
    return newWish;
  },

  // id 값을 기준으로 찜 내역을 삭제
  async deleteWish(id) {
    console.log("id : ", id);

    await wishAccess.wishDelete(id);

    return;
  },
};

export { wishService };
