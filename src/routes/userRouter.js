import express from "express";
import { userService } from "../services";

const userRouter = express.Router();
userRouter.post("/register", async (req, res, next) => {
  const { email, name, nickname, password } = req.body;
  const newUser = await userService.createUser({
    email,
    name,
    nickname,
    password,
  });
  res.status(201).json(newUser);
});

export { userRouter };
