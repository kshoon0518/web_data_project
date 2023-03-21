import express from "express";
import { mainService } from "../services";
const mainRouter = express.Router();

mainRouter.post("/station", async (req, res, next) => {
  try {
    const { pos_x, pos_y } = req.body;
    const stationNear = await mainService.findNearStation(pos_x, pos_y);
    res.status(200).json({
      message: "가까운 역 조회에 성공했습니다.",
      station: stationNear,
    });
  } catch (err) {
    next(err);
  }
});

mainRouter.post("/stationWithin", async (req, res, next) => {
  try {
    const { stationId, time_min, time_max, type, price_min, price_max } =
      req.body;

    if (
      time_max < time_min ||
      price_max < price_min ||
      (type !== "rent" && type !== "lease")
    ) {
      res.status(404).json({
        message: "잘못된 입력값입니다.",
      });
    }

    const stationList = await mainService.findStationWithin(
      stationId,
      time_min,
      time_max,
      type,
      price_min,
      price_max,
    );
    res.status(200).json({
      message: "범위 내의 지하철역 조회에 성공했습니다.",
      stationList: stationList,
    });
  } catch (err) {
    next(err);
  }
});

export { mainRouter };
