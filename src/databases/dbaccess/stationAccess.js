import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const stationAccess = {
  // 지하철역 생성 create
  async stationCreate(stationInfo) {
    const newStation = await prisma.station.create({ data: stationInfo });

    if (!newStation) {
      console.error("지하철 데이터 검색 실패");
      throw new Error("데이터베이스에서 station을 검색하는데 실패했습니다.");
    }

    // 생성한 지하철 정보 반환
    return newStation;
  },

  // 지하철역 정보 검색 findUnique
  async stationFindUnique(stationId) {
    const foundStation = await prisma.station.findUnique({
      data: { stationId },
    });

    if (!foundStation) {
      console.error("지하철 데이터 검색 실패");
      throw new Error("데이터베이스에서 station을 검색하는데 실패했습니다.");
    }

    // 검색한 지하철 데이터 반환
    return foundStation;
  },
};

export { stationAccess };
