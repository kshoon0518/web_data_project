import express from "express";
import { isGuest } from "../middlewares";
import { kakaologinService } from "../services";
const kakaologinRouter = express.Router();

kakaologinRouter.post("/login/:code", isGuest, async (req, res, next) => {
  try {
    const { code } = req.params; //params로 인가코드를 받아옴
    const { isNewUser, accessToken, isAdmin } =
      await kakaologinService.loginKakaoUser(code);
    res.cookie("token", accessToken, {
      maxAge: 3600000,
      httpOnly: true,
      signed: true,
    });
    if (isNewUser) {
      res.status(201).json({
        message: "회원가입에 성공하였습니다.",
        isAdmin: isAdmin,
      });
    } else if (isAdmin) {
      res.status(201).json({
        message: "(관리자)로그인에 성공하였습니다.",
        isAdmin: isAdmin,
      });
    } else {
      res.status(201).json({
        message: "(사용자)로그인에 성공하였습니다.",
        isAdmin: isAdmin,
      });
    }
  } catch (err) {
    next(err);
  }
});

export { kakaologinRouter };
