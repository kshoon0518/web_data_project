import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  try {
    // 쿠키가 없는 경우
    if (!req.signedCookies) {
      return res
        .status(401)
        .json("관리자 권한이 있어야 사용이 가능한 서비스입니다.");
    }
    // 쿠키에 토큰이 없는 경우
    const token = req.signedCookies.token;
    if (!token) {
      return res
        .status(401)
        .json("관리자 권한이 있어야 사용이 가능한 서비스입니다.");
    }
    // 관리자 계정이 아닌 경우
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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
