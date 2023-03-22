import { dataAccess } from "../databases/dbaccess";

const dataService = {
  async dataStationCreate() {
    await dataAccess.dataStationCreate();
    return;
  },

  async dataTravelTimeCreate() {
    const data = await dataAccess.dataTravelTimeCreate();
    return data;
  },

  async stationAreaUpdate() {
    const area = await dataAccess.stationAreaUpdate();
    return area;
  },
};

export { dataService };
