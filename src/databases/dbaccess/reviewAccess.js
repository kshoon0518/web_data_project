import { prisma } from "./";

const reviewAccess = {
  async reviewCreate(reviewInfo) {
    const newReview = await prisma.review.create({ data: reviewInfo });
    return newReview;
  },

  async reviewFindByStationId(station_id) {
    const callStationReview = await prisma.review.findMany({
      where: { station_id: station_id },
    });
    return callStationReview;
  },

  async reviewFindByUserId(user_id) {
    const callIdReview = await prisma.review.findMany({
      where: { user_id: user_id },
    });
    return callIdReview;
  },

  async reviewUpdate({ review_id, body }) {
    const patchReview = await prisma.review.update({
      where: { id: review_id.review_id },
      data: { body: body },
    });
    return patchReview;
  },

  async reviewReviewIdDelete(review_id) {
    const delReviewIdReview = await prisma.review.delete({
      where: { id: review_id.review_id },
    });
    return delReviewIdReview;
  },
};

export { reviewAccess };
