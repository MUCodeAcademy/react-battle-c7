const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

pool.on("error", (err, client) => {
  if (err) {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  }
});

module.exports = pool;
