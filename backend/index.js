import express from "express";
import cors from "cors";

const app = express();
const PORT = 5173;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("i am working");
  res.send("i am working");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
