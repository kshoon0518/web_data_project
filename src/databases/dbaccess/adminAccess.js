import { prisma } from "./";

const adminAccess = {
  async adminFindAllUser() {
    const userList = prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        nickname: true,
        password: false,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return userList;
  },

  async adminDeleteUserById(userId) {
    const deletedUser = prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
    return deletedUser;
  },

  async adminFindOneUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  },

  async adminFindAllReview() {
    const reviewList = await prisma.review.findMany({
      select: {
        id: true,
        user_id: false,
        station_id: false,
        user: {
          select: {
            email: true,
            name: true,
            nickname: true,
          },
        },
        station: {
          select: {
            station_line: true,
            station_name: true,
          },
        },
        body: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
    return reviewList;
  },

  async adminFindOneReviewById(reviewId) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    return review;
  },

  async adminDeleteReviewById(reviewId) {
    const deletedReview = prisma.review.update({
      where: { id: reviewId },
      data: { deletedAt: new Date() },
    });
    return deletedReview;
  },
};

export { adminAccess };
