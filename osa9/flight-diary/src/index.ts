import express from "express";
const app = express();
import diaryRouter from "./routes/diaries";
app.use(express.json());
import cors from "cors";

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use(cors());
app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
