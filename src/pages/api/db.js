import mysql from "mysql2/promise";

export async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3307, 
    user: "root",
    password: "",
    database: "schooldb"
  });
  return connection;
}
