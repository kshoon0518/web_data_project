import { prisma } from "./";

const stationAccess = {
  // 지하철역 생성 create
  async stationCreate(stationInfo) {
    const newStation = await prisma.station.create({ data: stationInfo });

    // 생성한 지하철 정보 반환
    return newStation;
  },

  // 지하철역 정보 검색 findUnique
  async stationFindUnique(stationId) {
    const foundStation = await prisma.station.findUnique({
      where: stationId,
    });

    // 검색한 지하철 데이터 반환
    return foundStation;
  },
};

export { stationAccess };
