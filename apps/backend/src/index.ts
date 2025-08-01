import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/hello", (_req, res) => res.send("hi there"));

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
