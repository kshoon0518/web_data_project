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

export { mainRouter };
