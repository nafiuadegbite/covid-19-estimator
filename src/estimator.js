const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region
  } = data;
  let factor;
  let period;

  if (periodType === 'days') {
    factor = Math.trunc(timeToElapse / 3);
    period = timeToElapse;
  } else if (periodType === 'weeks') {
    factor = Math.trunc((timeToElapse * 7) / 3);
    period = timeToElapse * 7;
  } else {
    factor = Math.trunc((timeToElapse * 30) / 3);
    period = timeToElapse * 30;
  }
  // impact estimations
  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * 2 ** factor;
  const casesByRequestedTime = Math.trunc((impactInfectionsByRequestedTime) * (15 / 100));
  const impactHospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds) * (35 / 100)
     - casesByRequestedTime);
  const impactCasesForICUByRequestedTime = Math.trunc((impactInfectionsByRequestedTime)
   * (5 / 100));
  const impactCasesForVentilatorsByRequestedTime = Math.trunc((impactInfectionsByRequestedTime)
     * (2 / 100));
  const impactDollarsInFlight = Math.trunc((impactInfectionsByRequestedTime
     * region.avgDailyIncomePopulation
  * region.avgDailyIncomeInUSD) / period);

  // severe impact estimations
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * 2 ** factor;
  const severeCasesByRequestedTime = Math.trunc((severeImpactInfectionsByRequestedTime)
   * (15 / 100));
  const hospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds) * (35 / 100)
     - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(severeImpactInfectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc((severeImpactInfectionsByRequestedTime)
     * 0.02);
  const dollarsInFlight = Math.trunc((severeImpactInfectionsByRequestedTime
     * region.avgDailyIncomePopulation
  * region.avgDailyIncomeInUSD) / period);

  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: casesByRequestedTime,
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight
  };

  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
