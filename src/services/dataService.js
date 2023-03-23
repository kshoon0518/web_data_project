import { dataAccess } from "../databases/dbaccess";

const dataService = {
  async dataStationCreate() {
    await dataAccess.dataStationCreate();
    return;
  },

  async dataStationUpdate() {
    await dataAccess.dataStationUpdate();
    return;
  },

  async dataCrowdedCreate() {
    await dataAccess.dataCrowdedCreate();
    return;
  },

  async dataCrowdedUpdate() {
    await dataAccess.dataCrowdedUpdate();
    return;
  },

  async dataTravelTimeCreate() {
    const data = await dataAccess.dataTravelTimeCreate();
    return data;
  },

  async dataFacilitiesCreate(field) {
    const datas = await dataAccess.dataReadFacilities(field);
    const newData = [];
    for (let data of datas) {
      const dataObj = {
        name: data[0],
        pos_x: Number(data[1]),
        pos_y: Number(data[2]),
      };
      newData.push(dataObj);
    }
    const createdData = await dataAccess.dataPostFacilities(newData, field);
    return createdData.count;
  },
};

export { dataService };
