import express from'express';
import { validationResult } from 'express-validator';
import { StationService } from '../services'

const stationRouter = express.Router();

stationRouter.post('/station', async (req, res, next) => {
    try {
        // 유효성 검증
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error("Validation fail, entered data is incorrect.");
        error.status(400);
        throw error;
        }

        const stationInfo = req.body;

        // 서비스 로직으로 전달
        const newStation = await StationService.postStation(stationInfo);

        // 결과값 응답 회신
        res.status().json(newStation);

    } catch(err) {
        next(err);
    }
})

export default stationRouter;