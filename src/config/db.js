require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result);
}

module.exports = sql