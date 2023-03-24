import { adminAccess } from "../databases/dbaccess";
import { setError } from "../utils";

const adminService = {
  async getUserList() {
    const userList = await adminAccess.adminFindAllUser();
    return userList;
  },

  async deleteUser(userId) {
    const user = await adminAccess.adminFindOneUserById(userId);
    if (!user) {
      const msg = "존재하지 않는 계정입니다.";
      setError(msg, 400);
    }
    if (user.deletedAt) {
      const msg = "이미 삭제된 계정입니다.";
      setError(msg, 400);
    }
    const deletedUser = await adminAccess.adminDeleteUserById(userId);
    return deletedUser;
  },

  async getReviewList() {
    const reviewList = await adminAccess.adminFindAllReview();
    return reviewList;
  },

  async deleteReview(reviewId) {
    const review = await adminAccess.adminFindOneReviewById(reviewId);
    if (!review) {
      const msg = "리뷰가 존재하지 않습니다.";
      setError(msg, 400);
    }
    if (review.deletedAt) {
      const msg = "이미 삭제된 리뷰입니다.";
      setError(msg, 400);
    }
    const deletedReview = await adminAccess.adminDeleteReviewById(reviewId);
    return deletedReview;
  },
};

export { adminService };
