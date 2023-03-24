import jwt from "jsonwebtoken";
import { kakaologinAccess, userAccess } from "../databases/dbaccess";
import axios from "axios";
import bcrypt from "bcrypt";

const kakaologinService = {
  async loginKakaoUser(kakaouserInfo) {
    //액세스 토큰을 받아온다
    const resultToken = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_DIRECT_URI,
        code: kakaouserInfo,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      },
    );
    const kakaoAccessToken = resultToken.data.access_token;

    //유저 정보를 받아온다
    const resultUser = //{ data: kakaoUser }
      await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      });
    const kakaoId = resultUser.data.id.toString();
    const existingUser = await kakaologinAccess.kakaoUserFind(kakaoId);

    if (existingUser && !existingUser.deletedAt) {
      //기존회원
      const accessToken = jwt.sign(
        { user_id: existingUser.id, isAdmin: existingUser.isAdmin },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      return {
        isNewUser: false,
        accessToken: accessToken,
        isAdmin: existingUser.isAdmin,
      };

      //비회원
    } else {
      const kakaouserEmail = Math.random().toString(36).slice(2) + "@kakao.com";
      const kakaoRandomPassword = Math.random().toString(10).slice(2);
      const kakaoUserPassword = await bcrypt.hash(kakaoRandomPassword, 10);
      const newUser = await userAccess.userCreate({
        email: kakaouserEmail,
        name: resultUser.data.properties.nickname,
        nickname: resultUser.data.properties.nickname,
        kakaoId: kakaoId,
        password: kakaoUserPassword,
      });

      const accessToken = jwt.sign(
        { user_id: newUser.id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      return {
        isNewUser: true,
        accessToken: accessToken,
        isAdmin: newUser.isAdmin,
      };
    }
  },
};

export { kakaologinService };
