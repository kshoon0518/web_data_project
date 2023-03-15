// 라이브러리 임포트
import express from "express";
import cookieParser from "cookie-parser";

// express 서버 환경 설정
const app = express();
const port = process.env.PORT || 8001;

// express 서버 열기
app.listen(port, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${port}`);
});

// ---------

// 라우터 임포트
import { userRouter, stationRouter } from "./routes";
// ---------

// 미들웨어 등록
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_KEY));
// ---------

// 라우터 등록
app.use("/", userRouter);
app.use("/", stationRouter);
// ---------

// 에러처리 미들웨어

// ---------
