import express from "express";
import { stationService } from "../services";
import { setError } from "../utils";
const stationRouter = express.Router();

stationRouter.post("/station", async (req, res, next) => {
  try {
    // 요청 바디에서 필요한 내용 확인
    const dataStation = req.body;
    if (!dataStation) {
      const msg = "req.body가 없습니다.";
      setError(msg, 401);
    }

    // station을 생성하는 서비스 로직으로 전달
    const newStation = await stationService.postStation({
      ...dataStation,
    });

    // 결과값 응답 회신
    res.status(200).json(newStation);
  } catch (err) {
    next(err);
  }
});

stationRouter.get("/station/:station_id", async (req, res, next) => {
  try {
    // 파라미터 값 확인
    const { station_id } = req.params;

    // station 정보를 검색하는 서비스 로직으로 전달
    const dataStation = await stationService.findStation(station_id);

    // 검색 결과 지하철역 정보 회신
    res.status(200).json(dataStation);
  } catch (err) {
    next(err);
  }
});

stationRouter.get("/facilities/:station_id", async (req, res, next) => {
  try {
    const { station_id } = req.params;
    const facilityDatas = await stationService.getFacilitiesInfo(station_id);
    res
      .status(200)
      .json({ message: "조회에 성공하셨습니다.", data: facilityDatas });
  } catch (err) {
    next(err);
  }
});

export { stationRouter };
