import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  ssl: { rejectUnauthorized: false },
});

const app = express();
const PORT = 5173;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("i am working");
  res.send("i am working");
});

app.get("/heroes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM heroes");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
