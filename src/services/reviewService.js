import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";

const userService = {
  async createUser(userInfo) {
    const hashed = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashed;
    const newUser = await userAccess.userCreate(userInfo);
    return newUser;
  },

  async login(login_info) {
    const { email, password } = login_info;
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
};

export { userService };
