import mysql from "mysql2/promise";

const dbmysql = await mysql.createConnection({
  host: process.env.NEXT_PUBLIC_MYSQL_DBHOST,
  user: process.env.NEXT_PUBLIC_MYSQL_DBUSER,
  password: process.env.NEXT_PUBLIC_MYSQL_DBPASS,
  database: process.env.NEXT_PUBLIC_MYSQL_DBNAME,
});

export default dbmysql;
