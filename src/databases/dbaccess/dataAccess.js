import { prisma } from "./";
import fs from "fs";
import { parse } from "csv-parse/sync";

const dataAccess = {
  async dataStationCreate() {
    const data = fs.readFileSync(
      //   "project/src/databases/data/stationData.csv",
      "/Users/jeongjong10/Desktop/Computer Science.nosync/Alice_AI_note/project/2team/project/src/databases/data/stationData.csv",
      //   "../data/stationData.csv",
      "utf8",
    );
    const line = parse(data); // [ '', '지하철역명', '노선명', 'X좌표값', 'Y좌표값' ],
    line.shift();
    console.log(line[0]);

    // const [
    //   index,
    //   station_name,
    //   station_line,
    //   pos_x,
    //   pos_y,
    //   rent_price,
    //   lease_price,
    // ] = line[0];

    // console.log(typeof Number(rent_price));
    // const newData = await prisma.station.create({
    //   data: {
    //     station_name,
    //     station_line,
    //     area: "",
    //     pos_x,
    //     pos_y,
    //     rent_price: 1,
    //     lease_price: 2,
    //     // rent_price: rent_price,
    //     // lease_price: lease_price,
    //   },
    // });
    // console.log(newData);

    for (let row of line) {
      const [
        index,
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
};

export { dataAccess };
