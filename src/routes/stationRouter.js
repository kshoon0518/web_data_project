import express from "express";
import { stationService } from "../services";
const stationRouter = express.Router();

stationRouter.post("/station", async (req, res, next) => {
  try {
    // 요청 바디에서 필요한 내용 확인
    const dataStation = req.body;
    console.log(dataStation);

    // if (!station_line || !station_name) {
    //   console.error("req.body에 정보가 없음");
    //   throw new Error("req.body가 없습니다.");
    // }

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

    if (station_id === ":station_id") {
      console.error("req.params에 station_id가 없음");
      throw new Error("req.params가 없습니다.");
    }

    // station 정보를 검색하는 서비스 로직으로 전달
    const dataStation = await stationService.findStation({ station_id });

    // 검색 결과 지하철역 정보 회신
    res.status(200).json(dataStation);
  } catch (err) {
    next(err);
  }
});

export { stationRouter };

// then catch 스타일로 작성?
// stationRouter.post(“/station”, async (req, res, next) => {
//   await StationService.postStation(req.body.???)
//     .then( result => res.json(result))
//     .catch(err => erroHandler(err));
// });
