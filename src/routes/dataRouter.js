import express from "express";
import { dataService } from "../services";
const dataRouter = express.Router();

dataRouter.get("/station_data", async (req, res, next) => {
  try {
    await dataService.dataStationCreate();
    res.status(200).json({ message: "데이터 입력완료" });
  } catch (err) {
    next(err);
  }
});

dataRouter.get("/travel_time", async (req, res, next) => {
  try {
    const data = await dataService.dataTravelTimeCreate();
    res.status(200).json({ message: ` ${data}개 데이터 입력완료`, data: data });
  } catch (err) {
    next(err);
  }
});

dataRouter.post("/facilities", async (req, res, next) => {
  try {
    const { field } = req.body;
    const data = await dataService.dataFacilitiesCreate(field);
    res.status(201).json({
      message: ` ${data}개 데이터 입력완료`,
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

export { dataRouter };
