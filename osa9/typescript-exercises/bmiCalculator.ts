const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi > 16 && bmi < 17:
      return "Underweight (Moderate thinness)";
    case bmi > 17 && bmi < 18.5:
      return "Underweight (Mild thinness)";
    case bmi > 18.5 && bmi < 25:
      return "Normal range";
    case bmi > 25 && bmi < 30:
      return "Overweight (Pre-obese)";
    case bmi > 30 && bmi < 35:
      return "Obese (Class I)";
    case bmi > 35 && bmi < 40:
      return "Obese (Class II)";
    case bmi > 40:
      return "Obese (Class III)";
    default:
      return "BMI value out of range";
  }
};

try {
  const args = process.argv.slice(2).map(Number);
  if (!(args.length == 2) || args.some(isNaN)) {
    throw new Error("Provide two numbers: height followed by weight");
  }
  const height = args[0];
  const weight = args[1];
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.error("Error:", (e as Error).message);
}
