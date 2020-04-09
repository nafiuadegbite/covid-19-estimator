const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;

  let factor;
  // let period;

  if (periodType === 'days') {
    factor = timeToElapse / 3;
    // period = timeToElapse;
  } else if (periodType === 'weeks') {
    factor = (timeToElapse * 7) / 3;
    // period = timeToElapse * 7;
  } else {
    factor = (timeToElapse * 30) / 3;
    // period = timeToElapse * 30;
  }

  // impact estimation
  const impactCurrentlyInfected = reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * 2 ** factor;

  // severeImpact estimation
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * 2 ** factor;

  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime
  };

  const severeImpact = {
    currentlyInfected: severeImpactCurrentlyInfected,
    infectionsByRequestedTime: severeImpactInfectionsByRequestedTime
  };

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
