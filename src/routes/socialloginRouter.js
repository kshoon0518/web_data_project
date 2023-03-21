import express from "express";

socialloginRouter.post("/login/kakao_login", async (req, res, next) => {
  const { code } = req.query; //쿼리로 인가코드를 받아옴

  try {
    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
});

export { socialloginRouter };
