import express from "express";
import { reviewService } from "../services";
const reviewRouter = express.Router();

// 리뷰 작성 create
// validation의 목적은 무엇인지?, 미들웨어로 한방에 해결할 수 없는지>
reviewRouter.post("/review", async (req, res, next) => {
  try {
    const { user_id, station_id, body } = req.body;
    const newReview = await reviewService.addReview({
      user_id,
      station_id,
      body,
    });
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

export default reviewRouter;
