// burnRateUtils.js

function calculateBurnRate(expenses, revenue) {
  var monthlyBurnRate = expenses - revenue;
  var annualBurnRate = monthlyBurnRate * 12;
  return {
    monthly: monthlyBurnRate,
    annual: annualBurnRate
  };
}

export default calculateBurnRate;


