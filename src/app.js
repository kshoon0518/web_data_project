// 라이브러리 임포트
import express from "express";

// express 서버 환경 설정
const app = express();
const port = process.env.PORT || 8001;

// express 서버 열기
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

// ---------

// 라우터 임포트
import { reviewRouter, userRouter } from "./routes";
// ---------

// 미들웨어 등록
app.use(express.json());

// ---------

// 라우터 등록
app.use("/", reviewRouter);
app.use("/", userRouter);

// ---------

// 에러처리 미들웨어

// ---------
