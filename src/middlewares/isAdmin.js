import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";
import { setError } from "../utils";

// 관리자 권한의 API에 접근시 쿠키와 계정 정보를 확인하여 사전 차단 혹은 인가 하는 미들웨어
const isAdmin = async (req, res, next) => {
  try {
    // 쿠키가 없는 경우
    if (!req.signedCookies) {
      const msg =
        "관리자 권한이 있어야 사용이 가능한 서비스입니다. 현재 쿠키가 없습니다.";
      setError(msg, 401);
    }

    // 쿠키에 토큰이 없는 경우
    const token = req.signedCookies.token;
    if (!token) {
      const msg =
        "관리자 권한이 있어야 사용이 가능한 서비스입니다. 현재 토큰이 없습니다.";
      setError(msg, 401);
    }
    // 계정이 삭제된 경우
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.user_id;
    const userValid = await userAccess.userFindOneById(userId).deletedAt;
    if (userValid) {
      const msg =
        "관리자 권한이 있어야 사용이 가능한 서비스입니다. 현재 삭제된 계정입니다.";
      setError(msg, 401);
    }
    // 관리자 계정이 아닌 경우
    if (!decoded.isAdmin) {
      const msg = "관리자 권한이 있어야 사용이 가능한 서비스입니다.";
      setError(msg, 401);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { isAdmin };
