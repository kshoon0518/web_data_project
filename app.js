// 라이브러리 임포트
const mysql = require("mysql");

// ---------


// 라우터 임포트

// ---------

// mysql 연결
const connection = mysql.createConnection({
  host: "localhost", // 이후 클라우드 주소
  user: "root",
  password: "",
  database: "my_db",
});

connection.connect();
// 연결 유무를 확인하는 처리 필요

// 작동 유무 확인
// connection.query(
//   "INSERT INTO Users (id, password) VALUES ('ungmo3', '1234')",
//   (error, rows, fields) => {
//     if (error) throw error;
//     console.log("User info is: ", rows);
//   }
// );
// connection.query("SELECT * from Users", (error, rows, fields) => {
//   if (error) throw error;
//   console.log("User info is: ", rows);
// });

// 로컬단에서 서버를 열고 닫는 것인가?
connection.end();

// ---------


// 미들웨어 등록

// ---------

// 라우터 등록

// ---------

// 에러처리 미들웨어

// ---------
