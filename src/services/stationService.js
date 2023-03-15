import { stationAccess } from "../databases/dbaccess";

const stationService = {
  // station 생성 서비스
  async postStation(stationInfo) {
    console.log("stationInfo : ", stationInfo);

    // db엑세스로 생성할 역의 정보 전달
    const newStation = await stationAccess.stationCreate(stationInfo);

    // 생성된 지하철역 반환
    return newStation;
  },

  // station 검색 서비스 (매개변수 : station_id)
  async findStation(stationId) {
    console.log("station_id : ", stationId);

    // db엑세스로 검색할 역의 id를 전달
    const foundStation = await stationAccess.stationFindUnique(stationId);

    // 검색한 지하철역 정보 반환
    return foundStation;
  },
};

export { stationService };
