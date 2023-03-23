const isGuest = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      return res.status(401).json({ message: "이미 로그인한 상태입니다." });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { isGuest };
