const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pg_expiry_system",
  password: "10901090",
  port: 5432,
});

module.exports = pool;