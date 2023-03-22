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

dataRouter.get("/travel_time", async (req, res, next) => {
  try {
    const data = await dataService.dataTravelTimeCreate();
    res.json({ message: ` ${data}개 데이터 입력완료` });
  } catch (err) {
    next(err);
  }
});

dataRouter.post("/facilities", async (req, res, next) => {
  try {
    const { field } = req.body;
    const data = await dataService.dataFacilitiesCreate(field);
    res.json({ message: ` ${data}개 데이터 입력완료` });
  } catch (err) {
    next(err);
  }
});

export { dataRouter };
