const pool = require("./db");

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("Users table created successfully!");
    pool.end();
  } catch (err) {
    console.error("Error creating table:", err);
    pool.end();
  }
};

createTable();
