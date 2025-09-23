interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hoursPerDay: number[], target: number): Result => {
  const sum = hoursPerDay.reduce((partialSum, a) => partialSum + a, 0);
  const trainingDays = hoursPerDay.filter((a) => a > 0).length;
  const average = sum / trainingDays;
  let success = null;
  let rating = null;
  let ratingDescription = "";

  if (average > target) {
    success = true;
  } else {
    success = false;
  }

  if (average > target) {
    rating = 3;
    ratingDescription = "Good job, target met or exceeded";
  } else if (average > target * 0.8) {
    rating = 2;
    ratingDescription = "Almost reached target";
  } else {
    rating = 1;
    ratingDescription = "More exercise is required";
  }

  return {
    periodLength: hoursPerDay.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

const parseInput = (): { target: number; hours: number[] } => {
  const args = process.argv.slice(2).map(Number);
  if (args.length < 2 || args.some(isNaN)) {
    throw new Error("Provide at least one number for target and one for hours");
  }
  const target = args[0];
  const hours = args.slice(1);
  return { target, hours };
};

try {
  const { target, hours } = parseInput();
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.error("Error:", (e as Error).message);
}
