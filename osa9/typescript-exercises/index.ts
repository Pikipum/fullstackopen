import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
//import { Result } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    res.send({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);

    const obj = {
      height,
      weight,
      bmi,
    };
    res.send(obj);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    daily_exercises.some((n) => typeof n !== "number" || isNaN(n)) ||
    typeof target !== "number" ||
    isNaN(target)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
