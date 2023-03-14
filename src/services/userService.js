import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserService {
  constructor(user) {
    this.user = user;
    this.addUser = this.addUser.bind(this);
  }

  async addUser(userInfo) {
    const newUser = await this.user.create({ data: userInfo });
    return newUser;
  }
}

const userService = new userService(prisma.user);

export { userService };
