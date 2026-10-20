const mysql = require("mysql2/promise");

// Ensures the variable evaluates properly on Render
const useSsl = process.env.DB_SSL_MODE === "true";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: useSsl ? { minVersion: "TLSv1.2", rejectUnauthorized: true } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


module.exports = pool;
