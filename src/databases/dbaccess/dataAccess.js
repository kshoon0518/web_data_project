import { prisma } from "./";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const __dirname = path.resolve();

const dataAccess = {
  // 스테이션 데이터 생성
  async dataStationCreate() {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "stationData" + ".csv",
    );
    const data = fs.readFileSync(csvPath, "utf8");
    const line = parse(data);
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
  // 스테이션 데이터 업데이트
  async dataStationUpdate() {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "stationData_for_update" + ".csv",
    );
    const data = fs.readFileSync(csvPath, "utf8");
    const line = parse(data);
    line.shift();

    for (let row of line) {
      const [
        idx,
        station_id,
        station_name,
        station_line,
        area,
        rent_price,
        lease_price,
        pos_x,
        pos_y,
      ] = row;

      // 업데이트할 데이터 검색
      const station = await prisma.station.findMany({
        where: {
          station_name: station_name,
          station_line: station_line,
        },
      });

      // 데이터 업데이트
      if (station.length != 0) {
        const stationId = station[0].id;
        const updatedData = await prisma.station.updateMany({
          where: {
            id: stationId,
          },
          data: {
            rent_price: parseFloat(rent_price),
            lease_price: parseFloat(lease_price),
          },
        });
      }
    }
    return;
  },

  // 상행으로 크리에이트
  async dataCrowdedCreate() {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "station_crowdedness_upbound" + ".csv",
    );
    const data = fs.readFileSync(csvPath, "utf8");
    const line = parse(data); //
    line.shift();

    for (let row of line) {
      const [
        idx,
        station_name,
        station_line,
        direct,
        startTime_upbound,
        endTime_upbound,
      ] = row;

      const station = await prisma.station.findMany({
        where: {
          station_name: station_name,
          station_line: station_line,
        },
      });
      if (station.length != 0) {
        const stationId = station[0].id;
        const newData = await prisma.StationCrowdedness.create({
          data: {
            station_id: stationId,
            startTime_upbound: parseInt(startTime_upbound),
            endTime_upbound: parseInt(endTime_upbound),
          },
        });
      }
    }

    return;
  },
  // 하행으로 업데이트
  async dataCrowdedUpdate() {
    const csvPath = path.join(
      __dirname,
      "src",
      "databases",
      "data",
      "station_crowdedness_downbound" + ".csv",
    );
    const data = fs.readFileSync(csvPath, "utf8");
    const line = parse(data); //
    line.shift();

    for (let row of line) {
      const [
        idx,
        station_name,
        station_line,
        direct,
        startTime_downbound,
        endTime_downbound,
      ] = row;

      const station = await prisma.station.findMany({
        where: {
          station_name: station_name,
          station_line: station_line,
        },
      });
      if (station.length != 0) {
        const stationId = station[0].id;
        const updatedData = await prisma.StationCrowdedness.updateMany({
          where: { station_id: stationId },
          data: {
            startTime_downbound: parseInt(startTime_downbound),
            endTime_downbound: parseInt(endTime_downbound),
          },
        });
      }
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
