import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ReviewService {
  constructor(review) {
    this.review = review;
    this.addReview = this.addReview.bind(this);
  }

  async addReview(reviewInfo) {
    const newReview = await this.review.create({ data: reviewInfo });
    return newReview;
  }
}

const reviewService = new ReviewService(prisma.review);

export { reviewService };

