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
};

export { dataService };
