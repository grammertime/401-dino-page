import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  try {
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255) NOT NULL DEFAULT ''");
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS emoji VARCHAR(16) NOT NULL DEFAULT '🦕'");
    console.log("Migration completed: username and emoji columns added.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
