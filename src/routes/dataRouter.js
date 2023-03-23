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

dataRouter.patch("/station_data", async (req, res, next) => {
  try {
    await dataService.dataStationUpdate();
    res.status(200).json({ message: "데이터 수정완료" });
  } catch (err) {
    next(err);
  }
});

dataRouter.post("/station_crowdedness_startTime", async (req, res, next) => {
  try {
    await dataService.dataCrowdedCreate();
    res.json({ message: "상행 혼잡도 데이터 입력완료" });
  } catch (err) {
    next(err);
  }
});

dataRouter.patch("/station_crowdedness_endTime", async (req, res, next) => {
  try {
    await dataService.dataCrowdedUpdate();
    res.json({ message: "하행 혼잡도 데이터 입력 완료" });
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
