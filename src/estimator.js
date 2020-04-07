const covid19ImpactEstimator = (data) => {
  const input = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  const estimateCurrentlyInfected = {
    currentlyInfected: input.reportedCases * 10
  };

  const estimateProjectedInfection = {
    currentlyInfected: input.reportedCases * 50
  };
  return {
    data: input,
    impact: estimateCurrentlyInfected,
    severeImpact: estimateProjectedInfection
  };
};

export default covid19ImpactEstimator;
