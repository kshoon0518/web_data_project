import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";
import { setError } from "../utils";

// 쿠키를 확인하여 res.user_id에 사용자의 id를 담아 반환.
const isUser = async (req, res, next) => {
  try {
    // 쿠키가 없는 경우
    if (!req.signedCookies) {
      const msg = "로그인을 해야 사용이 가능한 서비스입니다.";
      setError(msg, 401);
    }
    // 쿠키에 토큰이 없는 경우
    const token = req.signedCookies.token;
    if (!token) {
      const msg = "로그인을 해야 사용이 가능한 서비스입니다.";
      setError(msg, 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.user_id;
    const userValid = await userAccess.userFindOneById(userId).deletedAt;
    if (userValid) {
      const msg = "삭제된 회원입니다.";
      setError(msg, 401);
    }
    req.user_id = userId;
    next();
  } catch (err) {
    next(err);
  }
};

export { isUser };
