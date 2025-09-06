import mysql from "mysql2/promise";

export async function connectDB() {
  const urlString = process.env.MYSQL_PUBLIC_URL || "mysql://root:@localhost:3306/schooldb";
  const url = new URL(urlString);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password,
    database: url.pathname.replace("/", ""),
  });
  return connection;
}
