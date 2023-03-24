import { setError } from "../utils";

const isGuest = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      const msg = "이미 로그인한 상태입니다.";
      setError(msg, 400);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { isGuest };
