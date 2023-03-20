import express from "express";
import { dataService } from "../services";
const dataRouter = express.Router();

dataRouter.get("/station_data", async (req, res, next) => {
  try {
    await dataService.dataStationCreate();
    res.json({ message: "데이터 입력완료" });
  } catch (err) {
    next(err);
  }
});

export { dataRouter };
