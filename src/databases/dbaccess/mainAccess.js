import { prisma } from "./";

const mainAccess = {
  async findStationPos() {
    const stationList = await prisma.station.findMany({
      select: {
        id: true,
        station_name: false,
        station_line: false,
        area: false,
        rent_price: false,
        lease_price: false,
        pos_x: true,
        pos_y: true,
      },
    });
    return stationList;
  },

  async stationFindById(stationId) {
    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });

    // 검색한 지하철 데이터 반환
    return station;
  },
};
export { mainAccess };
