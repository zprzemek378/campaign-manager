import express from "express";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => res.send("hi there"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
