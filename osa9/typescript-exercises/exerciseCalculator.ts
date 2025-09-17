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
  const trainingDays = hoursPerDay.length;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
