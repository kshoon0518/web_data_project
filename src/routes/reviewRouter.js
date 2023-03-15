import express from "express";
import { reviewService } from "../services";
const reviewRouter = express.Router();

// 리뷰 작성
reviewRouter.get("/review/:station_id", async (req, res, next) => {
  try {
    const { station_id } = req.params;
    const newReview = await reviewService.getReview({
      station_id,
    });
    res.status(200).json(newReview);
  } catch (err) {
    next(err);
  }
});

export { reviewRouter };
