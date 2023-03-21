import jwt from "jsonwebtoken";
import { kakaologinAccess, userAccess } from "../databases/dbaccess";
import axios from "axios";

const kakaologinService = {
  async loginKakaoUser(kakaouserInfo) {
    console.log(kakaouserInfo);
    //액세스 토큰을 받아온다
    const {
      data: { access_token: kakaoAccessToken },
    } = await axios.post("https://kauth.kakao.com/oauth/token", {
      params: {
        grant_type: "authorization_code",
        client_id: "b5fed7f18075803554956c416973bb45",
        redirect_uri: "http://localhost:8001/ouath/?platform=kakao",
        code: kakaouserInfo,
      },
    });
    console.log(kakaoAccessToken);

    //유저 정보를 받아온다
    const { data: kakaoUser } = await axios(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      },
    );
    console.log(kakaoUser);

    const existingUser = kakaologinAccess.findOne(kakaoUser.id);
    console.log(existingUser);

    if (existingUser === null) {
      //회원가입한 유저
      const newUser = await userAccess.userCreate({
        email: kakaoUser.kakao_account.email,
        name: kakaoUser.kakao_account.name,
        nickname: kakaoUser.properties.nickname,
        password: Math.random().toString(10),
      });
      console.log(newUser);

      const accessToken = jwt.sign(
        { user_id: newUser.id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      console.log("newUser_accessToken:", accessToken);
      return accessToken;

      //기존유저
    } else {
      const accessToken = jwt.sign(
        { user_id: existingUser.id, isAdmin: existingUser.isAdmin },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      console.log("existingUser_accessToken:", accessToken);
      return accessToken;
    }
  },
};

export { kakaologinService };
