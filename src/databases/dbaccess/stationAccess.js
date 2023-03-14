import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StationAccess {
  async createStation(stationInfo) {
    // 프리즈마 create 메서드
    const newStation = await prisma.station.create(stationInfo);

    return newStation;
  }
}

// 클래스를 객체화 해서 익스포트
const stationAccess = new StationAccess(prisma.station);
export { stationAccess };
