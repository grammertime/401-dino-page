import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/users", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, username, emoji, created_at FROM users ORDER BY id"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }
  const { username, name, emoji } = req.body;
  try {
    const updates = [];
    const values = [];
    let paramIndex = 1;
    if (typeof username === "string") {
      updates.push(`username = $${paramIndex++}`);
      values.push(username);
    }
    if (typeof name === "string") {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (typeof emoji === "string") {
      updates.push(`emoji = $${paramIndex++}`);
      values.push(emoji);
    }
    if (updates.length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING id, name, email, username, emoji, created_at`,
      values
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
