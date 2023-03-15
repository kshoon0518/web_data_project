import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const reviewService = {
  async getReview(reviewInfo) {
    const newReview = await prisma.review.read({ data: reviewInfo });
    return newReview;
  },
};

export { reviewService };
