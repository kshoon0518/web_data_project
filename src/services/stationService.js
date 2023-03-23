import { stationAccess, dataAccess } from "../databases/dbaccess";
import haversine from "haversine-distance";

const stationService = {
  // station 생성 서비스
  async postStation(stationInfo) {
    // db엑세스로 생성할 역의 정보 전달
    const newStation = await stationAccess.stationCreate(stationInfo);

    // 생성된 지하철역 반환
    return newStation;
  },

  // station 검색 서비스 (매개변수 : station_id)
  async findStation(stationId) {
    // db엑세스로 검색할 역의 id를 전달
    const station = await stationAccess.stationFindUnique(stationId);

    // 검색한 지하철역 정보 반환
    return station;
  },

  async getFacilitiesInfo(stationId) {
    const station = await stationAccess.stationFindUnique(stationId);
    const parks = await dataAccess.dataGetFacilities("park");
    const marts = await dataAccess.dataGetFacilities("mart");
    const cinemas = await dataAccess.dataGetFacilities("cinema");
    const hospitals = await dataAccess.dataGetFacilities("hospital");
    const stationPos = { lat: station.pos_x, lng: station.pos_y };
    let nearParks = [];
    let nearMarts = [];
    let nearCinemas = [];
    let nearHospitals = [];

    for (let park of parks) {
      const parkPos = { lat: park.pos_x, lng: park.pos_y };
      const dist = Math.round(haversine(stationPos, parkPos));
      if (dist <= 1000) {
        nearParks.push({ name: park.name, dist: dist });
      }
    }
    for (let mart of marts) {
      const martPos = { lat: mart.pos_x, lng: mart.pos_y };
      const dist = Math.round(haversine(stationPos, martPos));
      if (dist <= 1000) {
        nearMarts.push({ name: mart.name, dist: dist });
      }
    }
    for (let cinema of cinemas) {
      const cinemaPos = { lat: cinema.pos_x, lng: cinema.pos_y };
      const dist = Math.round(haversine(stationPos, cinemaPos));
      if (dist <= 1000) {
        nearCinemas.push({ name: cinema.name, dist: dist });
      }
    }
    for (let hospital of hospitals) {
      const hospitalPos = { lat: hospital.pos_x, lng: hospital.pos_y };
      const dist = Math.round(haversine(stationPos, hospitalPos));
      if (dist <= 1000) {
        nearHospitals.push({ name: hospital.name, dist: dist });
      }
    }

    const facilityDatas = {
      park: nearParks,
      mart: nearMarts,
      cinemas: nearCinemas,
      hospitals: nearHospitals,
    };
    return facilityDatas;
  },
};

export { stationService };
