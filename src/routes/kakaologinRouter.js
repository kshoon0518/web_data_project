import express from "express";
import { kakaologinService } from "../services";
const kakaologinRouter = express.Router();

kakaologinRouter.post("/login/:code", async (req, res, next) => {
  try {
    const { code } = req.params; //params로 인가코드를 받아옴
    console.log(code);
    const accessToken = await kakaologinService.loginKakaoUser(code);

    res.json(accessToken);
  } catch (err) {
    res.status(403).json({
      message: err.message,
    });
  }
});

export { kakaologinRouter };
