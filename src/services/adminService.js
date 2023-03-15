import { adminAccess } from "../databases/dbaccess";

const adminService = {
  async getUserList() {
    const userList = await adminAccess.adminFindAllUser();
    return userList;
  },

  async deleteUser(userId) {
    const user = await adminAccess.adminFindOneUserById(userId);
    if (!user) {
      throw new Error("존재하지 않는 계정입니다.");
    }
    if (user.deletedAt) {
      throw new Error("이미 삭제된 계정입니다.");
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
      throw new Error("리뷰가 존재하지 않습니다.");
    }
    if (review.deletedAt) {
      throw new Error("이미 삭제된 리뷰입니다.");
    }
    const deletedReview = await adminAccess.adminDeleteReviewById(reviewId);
    return deletedReview;
  },
};

export { adminService };
