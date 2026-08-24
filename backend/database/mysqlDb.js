const mysql = require('mysql2/promise');

// MySQL Connection Configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'gramin_connect_db',
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let isConnected = false;

async function initMySQL() {
  try {
    pool = mysql.createPool(dbConfig);
    // Test connection
    const connection = await pool.getConnection();
    console.log(`===========================================`);
    console.log(` 🐬 MySQL Database Connected Successfully! `);
    console.log(` 📦 Database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}`);
    console.log(`===========================================`);
    connection.release();
    isConnected = true;
    return pool;
  } catch (err) {
    console.log(`ℹ️ MySQL connection skipped or offline (${err.code || err.message}).`);
    console.log(`⚡ Operating on High-Performance In-Memory Data Store.`);
    isConnected = false;
    return null;
  }
}

async function query(sql, params) {
  if (!isConnected || !pool) {
    throw new Error('MySQL is not connected');
  }
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = {
  initMySQL,
  query,
  getPool: () => pool,
  isMySQLConnected: () => isConnected
};
