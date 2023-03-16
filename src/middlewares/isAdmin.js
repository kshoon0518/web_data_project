import jwt from "jsonwebtoken";
import { userAccess } from "../databases/dbaccess";

const isAdmin = async (req, res, next) => {
  try {
    // 쿠키가 없는 경우
    if (!req.signedCookies) {
      return res
        .status(401)
        .json("관리자 권한이 있어야 사용이 가능한 서비스입니다.");
      // .json("쿠키가 존재하지 않습니다.")
    }
    /*
      Throw 문으로 변경
      if (!req.signedCookies) {
        Throw new Error("쿠키가 존재하지 않습니다.")
      }
    */

    // 쿠키에 토큰이 없는 경우
    const token = req.signedCookies.token;
    if (!token) {
      return res
        .status(401)
        .json("관리자 권한이 있어야 사용이 가능한 서비스입니다.");
      // .json("쿠키에 토큰이 존재하지 않습니다.")
    }
    // 계정이 삭제된 경우
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.user_id;
    const userValid = await userAccess.userFindOneById(userId).deletedAt;
    if (userValid) {
      return res.status(401).json("삭제된 계정입니다.");
    }
    // 관리자 계정이 아닌 경우
    if (!decoded.isAdmin) {
      return res
        .status(401)
        .json("관리자 권한이 있어야 사용이 가능한 서비스입니다.");
    }
    next();
  } catch (err) {
    return res.status(401).json("잘못된 토큰입니다.");
  }
};

export { isAdmin };
