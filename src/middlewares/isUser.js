import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";

const isUser = async (req, res, next) => {
  try {
    // 쿠키가 없는 경우
    if (!req.signedCookies) {
      return res.status(401).json("로그인을 해야 사용이 가능한 서비스입니다.");
    }
    // 쿠키에 토큰이 없는 경우
    const token = req.signedCookies.token;
    if (!token) {
      return res.status(401).json("로그인을 해야 사용이 가능한 서비스입니다.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.user_id;
    const userValid = await userAccess.userFindOneById(userId).deletedAt;
    if (userValid) {
      return res.status(401).json("삭제된 회원입니다.");
    }
    req.user_id = userId;
    next();
  } catch (err) {
    return res.status(401).json("잘못된 토큰입니다.");
  }
};

export { isUser };
