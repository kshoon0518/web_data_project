const pw = "";

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: pw,
  database: "my_db",
});

connection.connect();

connection.query(
  "INSERT INTO Users (id, password) VALUES ('ungmo3', '1234')",
  (error, rows, fields) => {
    if (error) throw error;
    console.log("User info is: ", rows);
  }
);
connection.query("SELECT * from Users", (error, rows, fields) => {
  if (error) throw error;
  console.log("User info is: ", rows);
});

connection.end();
