import express from "express";
import { reviewService } from "../services";
import { isUser } from "../middlewares";
const reviewRouter = express.Router();

//리뷰 작성
reviewRouter.post("/review/:station_id", isUser, async (req, res, next) => {
  try {
    const { station_id } = req.params;
    const user_id = req.user_id;
    const { body } = req.body;
    const newReview = await reviewService.addReview({
      station_id,
      user_id,
      body,
    });
    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

// 리뷰 불러오기
reviewRouter.get("/review", isUser, async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const newReview = await reviewService.readIdReview(user_id);
    res.status(200).json(newReview);
  } catch (err) {
    next(err);
  }
});

reviewRouter.get("/review/:station_id", async (req, res, next) => {
  try {
    const { station_id } = req.params;
    const newReview = await reviewService.readStationReview(station_id);
    res.status(200).json(newReview);
  } catch (err) {
    next(err);
  }
});

reviewRouter.patch("/review/:review_id", isUser, async (req, res, next) => {
  try {
    const review_id = req.params;
    const user_id = req.user_id;
    const { body } = req.body;
    if (review_id) {
      const updatedreview = await reviewService.updateReview({
        review_id,
        user_id,
        body,
      });
      res.status(200).json({ msessage: "리뷰가 수정되었습니다." });
    } else {
      res.status(200).json({ msessage: "리뷰수정에 실패하였습니다." });
    }
  } catch (err) {
    next(err);
  }
});

reviewRouter.delete("/review/:review_id", isUser, async (req, res, next) => {
  try {
    const review_id = req.params;
    await reviewService.deleteReviewIdReview(review_id);
    res.status(200).json({ msessage: "리뷰가 삭제되었습니다." });
    // res.status(200).end();
  } catch (err) {
    next(err);
  }
});

export { reviewRouter };
