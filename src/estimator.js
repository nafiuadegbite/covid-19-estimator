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
    factor = Math.floor(timeToElapse / 3);
    period = timeToElapse;
  } else if (periodType === 'weeks') {
    factor = Math.floor((timeToElapse * 7) / 3);
    period = timeToElapse * 7;
  } else {
    factor = Math.floor((timeToElapse * 30) / 3);
    period = timeToElapse * 30;
  }
  // impact estimations
  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * 2 ** factor;
  const casesByRequestedTime = Math.floor((impactInfectionsByRequestedTime * 15) / 100);
  const impactHospitalBedsByRequestedTime = Math.floor((totalHospitalBeds * 35
     - casesByRequestedTime) / 100);
  const impactCasesForICUByRequestedTime = Math.floor((impactInfectionsByRequestedTime * 5) / 100);
  const impactCasesForVentilatorsByRequestedTime = Math.floor((impactInfectionsByRequestedTime
     * 2) / 100);
  const impactDollarsInFlight = Math.floor(impactInfectionsByRequestedTime
     * region.avgDailyIncomePopulation
  * region.avgDailyIncomeInUSD * period);

  // severe impact estimations
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * 2 ** factor;
  const severeCasesByRequestedTime = Math.floor((severeImpactInfectionsByRequestedTime * 15) / 100);
  const hospitalBedsByRequestedTime = Math.floor((totalHospitalBeds * 35
     - severeCasesByRequestedTime) / 100);
  const casesForICUByRequestedTime = Math.floor(severeImpactInfectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.floor((severeImpactInfectionsByRequestedTime
     * 2) / 100);
  const dollarsInFlight = Math.floor(severeImpactInfectionsByRequestedTime
     * region.avgDailyIncomePopulation
  * region.avgDailyIncomeInUSD * period);

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
