import express from "express";
import { isUser } from "../middlewares";
import { userService } from "../services";
const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    const { email, name, nickname, password } = req.body;
    const newUser = await userService.createUser({
      email,
      name,
      nickname,
      password,
    });
    const isSuccess =
      newUser != null
        ? "회원가입에 성공하였습니다."
        : "회원가입에 실패하였습니다.";
    console.log(isSuccess);
    res.status(201).json(isSuccess);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login({ email, password });
    const isSuccess =
      token != null ? "로그인에 성공하였습니다." : "로그인에 실패하였습니다.";
    console.log(isSuccess);
    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      signed: true,
    });
    res.status(200).json(isSuccess);
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/logout", isUser, async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json("로그아웃하였습니다.");
  } catch (err) {
    next(err);
  }
});

export { userRouter };
