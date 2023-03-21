import { prisma } from "./";

const mainAccess = {
  async mainFindStationPos() {
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

  async mainStationFindById(stationId) {
    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });

    return station;
  },

  async mainFindTravelTime() {
    const travelTime = await prisma.travelTime.findMany({
      select: {
        id: true,
        travel_time: true,
        feel_time_weekday_d: true,
        feel_time_weekday_m: true,
        feel_time_weekday_n: true,
        feel_time_weekend_d: true,
        feel_time_weekend_m: true,
        feel_time_weekend_n: true,
        station_arv_id: true,
        station_dep_id: true,
        station_arv: {
          select: {
            station_name: true,
            station_line: true,
            pos_x: true,
            pos_y: true,
            rent_price: true,
            lease_price: true,
          },
        },
      },
    });
    return travelTime;
  },
};
export { mainAccess };
