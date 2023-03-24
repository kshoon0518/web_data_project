import { reviewAccess } from "../databases/dbaccess";

const reviewService = {
  async addReview(reviewInfo) {
    const newReview = await reviewAccess.reviewCreate(reviewInfo);
    return newReview;
  },

  async readStationReview(station_id) {
    const callStationReview = await reviewAccess.reviewFindByStationId(
      station_id,
    );
    return callStationReview;
  },

  async readIdReview(user_id) {
    const callIdReview = await reviewAccess.reviewFindByUserId(user_id);
    return callIdReview;
  },

  async updateReview({ review_id, body }) {
    const patchReview = await reviewAccess.reviewUpdate({ review_id, body });
    return patchReview;
  },

  async deleteReviewIdReview(review_id) {
    const delReviewIdReview = await reviewAccess.reviewReviewIdDelete(
      review_id,
    );
    return delReviewIdReview;
  },
};

export { reviewService };
