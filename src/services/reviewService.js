import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const reviewService = {
  async addReview(reviewInfo) {
    const newReview = await prisma.review.create({ data: reviewInfo });
    return newReview;
  },
};

export { reviewService };

