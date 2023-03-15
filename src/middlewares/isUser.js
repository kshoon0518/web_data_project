import jwt from "jsonwebtoken";

const isUser = (req, res, next) => {
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
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    return res.status(401).json("잘못된 토큰입니다.");
  }
};

export { isUser };
