import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import campaignRoutes from "./routes/campaign.routes";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/api/campaigns", campaignRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: err.message,
    });
  }
);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
