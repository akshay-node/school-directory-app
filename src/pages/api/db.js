import mysql from "mysql2/promise";

export async function connectDB() {
  const url = new URL(process.env.MYSQL_PUBLIC_URL);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password,
    database: url.pathname.replace("/", ""),
  });
  return connection;
}
