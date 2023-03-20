import { dataAccess } from "../databases/dbaccess";

const dataService = {
  async dataStationCreate() {
    await dataAccess.dataStationCreate();
    return;
  },
};

export { dataService };
