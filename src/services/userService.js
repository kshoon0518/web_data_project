import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";
import { checkPassword } from "../utils/checkPassword";

const userService = {
  async createUser(userInfo) {
    const userEmail = await userAccess.userFindOneByEmail(userInfo.email);
    const userNickname = await userAccess.userFindOneByNickname(
      userInfo.nickname,
    );
    if (userEmail) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
    if (userNickname) {
      throw new Error("이미 존재하는 닉네임입니다.");
    }
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
    if (user.deletedAt) {
      throw new Error("삭제된 회원입니다.");
    }
    const isPasswordCorrect = await checkPassword(user.id, password);
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
    return { token: token, isAdmin: user.isAdmin };
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
    const isPasswordCorrect = await checkPassword(userId, oldPassword);
    if (!isPasswordCorrect) {
      throw new Error("기존 비밀번호를 잘못 입력하셨습니다.");
    }
    const password = await bcrypt.hash(newPassword, 10);
    const isSuccess = await userAccess.userUpdate(userId, {
      password: password,
    });
    return isSuccess;
  },

  async softDeleteUser(userId, password) {
    const isPasswordCorrect = await checkPassword(userId, password);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호를 잘못 입력하셨습니다.");
    }
    userAccess.userDeleteById(userId);
  },
};

export { userService };
