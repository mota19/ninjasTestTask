import express from "express";
import cors from "cors";
import heroes from "../Heroes.json" assert { type: "json" };

const app = express();
const PORT = 5173;

app.use(cors());
app.use(express.json());

app.get("/getHeroes", (req, res) => {
  res.json(heroes);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
