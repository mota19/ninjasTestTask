import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const app = express();
const PORT = 5175;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("i am working");
  res.send("i am working");
});

app.get("/heroes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * 5;
    const result = await pool.query("SELECT * FROM heroes LIMIT 5 OFFSET $1", [
      offset,
    ]);
    const totalPages = await pool.query("SELECT COUNT (*) FROM heroes");
    res.json({
      heroes: result.rows,
      totalPages: Math.ceil(totalPages.rows[0].count / 5),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/heroes", async (req, res) => {
  const { nickname, real_name, origin_description, superpowers } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO heroes (nickname,real_name,origin_description,superpowers) VALUES ($1, $2, $3, $4) RETURNING *",
      [nickname, real_name, origin_description, superpowers]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/heroes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM heroes WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
});

app.patch("/heroes/:id", async (req, res) => {
  const { id } = req.params;
  const { nickname, real_name, origin_description, superpowers } = req.body;
  try {
    const result = await pool.query(
      `UPDATE heroes SET nickname=$1, real_name=$2, origin_description=$3,
       superpowers=$4 WHERE id=$5 RETURNING *`,
      [nickname, real_name, origin_description, superpowers, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
