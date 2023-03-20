import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = member => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: member.id,
        user_id: member.user_id,
        nickname: member.nickname,
      },
      process.env.SECRET,
      {
        expiresIn: "id",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      },
    );
  });
};

export { generateToken };

const loginWithKakao = async (req, res) => {
  const { code } = req.query; //쿼리로 인가코드를 받아옴

  try {
    const {
      data: { access_token: kakaoAccessToken },
    } = await axios("https://kauth.kakao.com/oauth/token", {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI + "?platform=kakao",
        code: code,
      },
    }); //액세스 토큰을 받아온다

    const { data: kakaoUser } = await axios(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      },
    ); //유저 정보를 받아온다

    let existingMember = null;
    existingMember = await member.findOne({
      where: {
        user_id: kakaoUser.id,
      },
    });

    if (existingMember === null) {
      const newMember = await member.create({
        user_id: kakaoUser.id,
        nickname: kakaoUser.properties.nickname,
        profile_image: kakaoUser.properties.profile_image,
        email: kakaoUser.kakao_account.email || null,
        platform: "kakao",
      });

      const accessToken = await generateToken(newMember);
      res.json({
        success: true,
        accessToken,
      });
    } else {
      const accessToken = await generateToken(existingMember);
      res.json({
        success: true,
        accessToken,
      });
    }
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
};

export { loginWithKakao };
