import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserService {
  constructor(user) {
    this.user = user;
    this.createUser = this.createUser.bind(this);
  }

  //user 생성함수
  async createUser(userInfo) {
    const newUser = await this.user.create({ data: userInfo });
    return newUser != null ? true : false;
  }
}

const userService = new UserService(prisma.user);
export { userService };
