import express from "express";
import { isAdmin } from "../middlewares";
import { adminService } from "../services";
const adminRouter = express.Router();

adminRouter.get("/users", isAdmin, async (req, res, next) => {
  try {
    const userList = await adminService.getUserList();
    res.status(200).json(userList);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/users/:user_id", isAdmin, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const userDeleted = await adminService.deleteUser(user_id);
    res.status(200).json({ message: "회원 삭제(비활성화)에 성공하였습니다." });
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/review", isAdmin, async (req, res, next) => {
  try {
    const reviewList = await adminService.getReviewList();
    res.status(200).json(reviewList);
  } catch (err) {
    next(err);
  }
});

adminRouter.delete("/review/:review_id", isAdmin, async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const reviewDeleted = await adminService.deleteReview(review_id);
    res.status(200).json({ message: "리뷰 삭제에 성공하였습니다." });
  } catch (err) {
    next(err);
  }
});

export { adminRouter };
