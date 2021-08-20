const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false },
});

pool.on("error", (err, client) => {
  if (err) {
    process.exit(-1);
  }
});

module.exports = pool;
