import { mainAccess } from "../databases/dbaccess";

const mainService = {
  async findNearStation(pos_x, pos_y) {
    const stationList = await mainAccess.findStationPos();
    let near = 10000;
    let nearStationId = "";
    for (let station of stationList) {
      const x1 = Number(station.pos_x);
      const y1 = Number(station.pos_y);
      const x2 = pos_x;
      const y2 = pos_y;

      const dist = (x1 - x2) ** 2 + (y1 - y2) ** 2;
      if (near > dist) {
        near = dist;
        nearStationId = station.id;
      }
    }
    const nearStation = await mainAccess.stationFindById(nearStationId);
    return nearStation;
  },
};

export { mainService };
