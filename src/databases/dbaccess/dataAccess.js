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
    const line = parse(data); // [ '', '�??��철역�?', '?��?���?', 'X좌표�?', 'Y좌표�?' ],
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
    const data = fs.readFileSync("../data/travel_time.csv", "utf-8");
    console.log(data);

    // const line = parse(data);
    // line.shift();

    // for (let row of line) {
    //   console.log(row);
    // }
    return data;
  },
};

export { dataAccess };
