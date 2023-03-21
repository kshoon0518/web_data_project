import { mainAccess } from "../databases/dbaccess";

const mainService = {
  async findNearStation(pos_x, pos_y) {
    const stationList = await mainAccess.mainFindStationPos();
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
    const nearStation = await mainAccess.mainStationFindById(nearStationId);
    return nearStation;
  },

  async findStationWithin(stationId, range) {
    const travelTime = await mainAccess.mainFindTravelTime();
    const firstDep = await mainAccess.mainStationFindById(stationId);
    const minTime = [
      {
        id: stationId,
        station: {
          station_name: firstDep.station_name,
          pos_x: firstDep.pos_x,
          pos_y: firstDep.pos_y,
          rent_price: firstDep.rent_price,
          lease_price: firstDep.lease_price,
        },
        time: 0,
        dm: 0,
        dd: 0,
        dn: 0,
        em: 0,
        ed: 0,
        en: 0,
      },
    ];

    while (true) {
      let updated = false;
      for (let travelTimeData of travelTime) {
        if (minTime.some(node => node.id == travelTimeData.station_dep_id)) {
          const {
            station_arv,
            station_dep_id,
            station_arv_id,
            feel_time_weekday_d,
            feel_time_weekday_m,
            feel_time_weekday_n,
            feel_time_weekend_d,
            feel_time_weekend_m,
            feel_time_weekend_n,
            travel_time,
          } = travelTimeData;
          const dep_node = minTime.find(node => node.id == station_dep_id);
          const arv_node = minTime.find(node => node.id == station_arv_id);
          const arv_time = dep_node.time + travel_time;
          const ftime_dm = dep_node.dm + feel_time_weekday_m;
          const ftime_dd = dep_node.dd + feel_time_weekday_d;
          const ftime_dn = dep_node.dn + feel_time_weekday_n;
          const ftime_em = dep_node.em + feel_time_weekend_m;
          const ftime_ed = dep_node.ed + feel_time_weekend_d;
          const ftime_en = dep_node.en + feel_time_weekend_n;

          if (!arv_node && arv_time <= range) {
            minTime.push({
              id: station_arv_id,
              station: station_arv,
              time: arv_time,
              dm: ftime_dm,
              dd: ftime_dd,
              dn: ftime_dn,
              em: ftime_em,
              ed: ftime_ed,
              en: ftime_en,
            });
            updated = true;
          }
        }
      }
      if (!updated) break;
    }
    return minTime;
  },
};

export { mainService };
