import stationAccess from "../databases/dbaccess";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StationService {
  // 컨스트럭터로 디스바인딩을 해주면,,,

  static async postStation(stationInfo) {
    const newStation = await stationAccess.createStation({ data: stationInfo });
    return newStation;
  }
}

export { StationService };
