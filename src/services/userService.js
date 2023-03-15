import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";

const userService = {
  async createUser(userInfo) {
    const hashed = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashed;
    const isSuccess = await userAccess.userCreate(userInfo);
    return isSuccess;
  },

  async login(logininfo) {
    const { email, password } = logininfo;
    const user = await userAccess.userFindOneByEmail(email);
    if (!user) {
      throw new Error("이메일을 잘못 입력하셨습니다.");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호를 잘못 입력하셨습니다.");
    }
    const token = jwt.sign(
      { user_id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    return token;
  },

  async getUserInfo(userId) {
    const user = await userAccess.userFindOneById(userId);
    if (!user) {
      throw new Error("해당 사용자는 존재하지 않습니다.");
    }
    return user;
  },

  async updateUserNickname(userId, nickname) {
    const isSuccess = await userAccess.userUpdate(userId, {
      nickname: nickname,
    });
    return isSuccess;
  },

  async updateUserPassword(userId, oldPassword, newPassword) {
    const user = await userAccess.userFindPasswordById(userId);
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호를 잘못 입력하셨습니다.");
    }
    const password = await bcrypt.hash(newPassword, 10);
    const isSuccess = await userAccess.userUpdate(userId, {
      password: password,
    });
    return isSuccess;
  },
};

export { userService };
