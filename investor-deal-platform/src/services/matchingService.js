const calculateMatchScore = (deal, preference) => {
  let score = 0;

  // Risk Match (30%)

  if (deal.riskLevel === preference.riskAppetite) {
    score += 30;
  }

  // Industry Match (25%)

  if (preference.preferredIndustries.includes(deal.industry)) {
    score += 25;
  }

  // Budget Compatibility (20%)

  if (preference.maxBudget >= deal.minInvestment) {
    score += 20;
  }

  // ROI (15%)

  score += (deal.expectedROI / 100) * 15;

  // Popularity (10%)

  score += (deal.currentRaisedAmount / deal.targetAmount) * 10;

  return Number(score.toFixed(2));
};

module.exports = calculateMatchScore;
