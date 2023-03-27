export function calculateLinearRegression(xValues, yValues) {
  const n = xValues.length;
  const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);

  const sumX = sum(xValues);
  const sumY = sum(yValues);
  const sumXY = sum(xValues.map((x, i) => x * yValues[i]));
  const sumXX = sum(xValues.map((x) => x * x));
  const sumYY = sum(yValues.map((y) => y * y));

  const slopeNumerator = (n * sumXY) - (sumX * sumY);
  const slopeDenominator = (n * sumXX) - (sumX * sumX);
  const slope = slopeNumerator / slopeDenominator;

  const intercept = (sumY - (slope * sumX)) / n;

  const rSquaredNumerator = (n * sumXY) - (sumX * sumY);
  const rSquaredDenominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  const rSquared = Math.pow(rSquaredNumerator / rSquaredDenominator, 2);

  return { slope, intercept, rSquared };
}
