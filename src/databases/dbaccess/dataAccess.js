import { prisma } from "./";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const __dirname = path.resolve();

const dataAccess = {
  async dataStationCreate() {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "stationData" + ".csv",
    );
    const data = fs.readFileSync(csvPath, "utf8");
    const line = parse(data); // [ '', '지하철역명', '노선명', 'X좌표값', 'Y좌표값' ],
    line.shift();

    for (let row of line) {
      const [
        station_name,
        station_line,
        pos_x,
        pos_y,
        rent_price,
        lease_price,
      ] = row;
      const newData = await prisma.station.create({
        data: {
          station_name,
          station_line,
          area: "",
          rent_price: Number(rent_price),
          lease_price: Number(lease_price),
          pos_x,
          pos_y,
        },
      });
    }

    return;
  },

  async dataTravelTimeCreate() {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "travel_time" + ".csv",
    );
    const csv = fs.readFileSync(csvPath, "utf-8");
    const line = parse(csv);
    line.shift();
    let count = 0;

    for (let row of line) {
      const [
        idx,
        station_line_dep,
        station_name_dep,
        station_line_arv,
        station_name_arv,
        travel_time,
        feel_time_weekday_m,
        feel_time_weekday_n,
        feel_time_weekday_d,
        feel_time_weekend_m,
        feel_time_weekend_d,
        feel_time_weekend_n,
      ] = row;
      const stationDep = await prisma.station.findMany({
        where: {
          station_name: station_name_dep,
          station_line: station_line_dep,
        },
      });
      const stationArv = await prisma.station.findMany({
        where: {
          station_name: station_name_arv,
          station_line: station_line_arv,
        },
      });
      const stationDepId = stationDep[0].id;
      const stationArvId = stationArv[0].id;
      const tt = await prisma.travelTime.create({
        data: {
          station_dep_id: stationDepId,
          station_arv_id: stationArvId,
          travel_time: Number(travel_time),
          feel_time_weekday_d: Number(feel_time_weekday_d),
          feel_time_weekday_m: Number(feel_time_weekday_m),
          feel_time_weekday_n: Number(feel_time_weekday_n),
          feel_time_weekend_d: Number(feel_time_weekend_d),
          feel_time_weekend_m: Number(feel_time_weekend_m),
          feel_time_weekend_n: Number(feel_time_weekend_n),
        },
      });
      if (tt) {
        count++;
      }
    }
    return count;
  },

  async dataReadFacilities(field) {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "facilities",
      field + ".csv",
    );
    const csv = fs.readFileSync(csvPath, "utf-8");
    const line = parse(csv);
    line.shift();
    return line;
  },

  async dataPostFacilities(newData, field) {
    const createdData = prisma[field].createMany({ data: newData });
    return createdData;
  },

  async dataGetFacilities(field) {
    const facilityDatas = prisma[field].findMany();
    return facilityDatas;
  },
};

export { dataAccess };
