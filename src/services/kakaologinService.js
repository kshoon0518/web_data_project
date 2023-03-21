import jwt from "jsonwebtoken";
import { kakaologinAccess } from "../databases/dbaccess";

const kakaologinService = {
  async loginKakaoUser(kakaouserInfo) {
    const isSuccess = await kakaouserAccess.kakaouserCreate(kakaouserInfo);
    return isSuccess;
  },
};

const {
  data: { access_token: kakaoAccessToken },
} = await axios("https://kauth.kakao.com/oauth/token", {
  params: {
    grant_type: "authorization_code",
    client_id: "b5fed7f18075803554956c416973bb45",
    redirect_uri: " http://localhost:8001/auth/oauth?platform=kakao",
    code: code,
  },
}); //액세스 토큰을 받아온다

const { data: kakaoUser } = await axios("https://kapi.kakao.com/v2/user/me", {
  headers: {
    Authorization: `Bearer ${kakaoAccessToken}`,
  },
}); //유저 정보를 받아온다

let existingMember = null;
existingMember = await member.findOne({
  where: {
    id: kakaoUser.id,
  },
});

if (existingMember === null) {
  const newMember = await member.create({
    id: kakaoUser.id,
    name: kakaoUser.kakao_account.name,
    nickname: kakaoUser.properties.nickname,
    email: kakaoUser.kakao_account.email || null,
    platform: "kakao",
  });

  const accessToken = await generateToken(newMember);
} else {
  const accessToken = await generateToken(existingMember);
}

return { accessToken };

export { kakaologinService };
