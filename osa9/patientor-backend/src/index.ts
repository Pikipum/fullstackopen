import express from "express";
const app = express();
app.use(express.json());
import diagnosisRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});


app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
