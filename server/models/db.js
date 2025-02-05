const mysql = require("mysql");
const con = mysql.createPool({
  //connectionLimit: 5,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  debug: false,
});
con.on("connection", (connection) => {
  console.log("Database connected!");
  connection.on("error", (err) => {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", (err) => {
    console.error(new Date(), "MySQL close", err);
  });
});
module.exports = con;
