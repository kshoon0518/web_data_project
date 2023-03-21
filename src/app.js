// 라이브러리 임포트
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// express 서버 환경 설정
const app = express();
const port = process.env.PORT || 8001;

// express 서버 열기
app.listen(port, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${port}`);
});

// ---------

// 라우터 임포트
import {
  userRouter,
  stationRouter,
  adminRouter,
  wishRouter,
  reviewRouter,
  dataRouter,
  mainRouter,
} from "./routes";

// ---------

// 미들웨어 등록
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_KEY));
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 클라이언트 주소
    credentials: true, // 쿠키 전달을 허용
  }),
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// ---------

// 라우터 등록
app.use("/", userRouter);
app.use("/", stationRouter);
app.use("/wish", wishRouter);
app.use("/admin", adminRouter);
app.use("/", reviewRouter);
app.use("/data", dataRouter);
app.use("/main", mainRouter);
// ---------

// 에러처리 미들웨어

// ---------
