const getArrDataAnnualTaxDeductions = (
  monthlySalary,
  propertyValue = 3000000,
  propertyValueLimiter = 2000000,
  maxTaxDeduction = 260000,
) => {
  const arrWithCalcData = [];

  const taxDeductionPerYear = (monthlySalary * 12) * 0.13;

  let totalTaxDeduction = 0;

  if (propertyValue < propertyValueLimiter) {
    while (totalTaxDeduction + taxDeductionPerYear <= propertyValue) {
      totalTaxDeduction += taxDeductionPerYear;
      arrWithCalcData.push(taxDeductionPerYear);
    };
    if (totalTaxDeduction < propertyValue) {
      arrWithCalcData.push(propertyValue - totalTaxDeduction);
    };
    return arrWithCalcData;
  }

  if (propertyValue >= propertyValueLimiter) {
    if (taxDeductionPerYear >= maxTaxDeduction) {
      arrWithCalcData.push(maxTaxDeduction);
    } else {
      while (totalTaxDeduction + taxDeductionPerYear <= maxTaxDeduction) {
        totalTaxDeduction += taxDeductionPerYear;
        arrWithCalcData.push(taxDeductionPerYear);
      };
      if (totalTaxDeduction < maxTaxDeduction) {
        arrWithCalcData.push(maxTaxDeduction - totalTaxDeduction);
      };
    };
    return arrWithCalcData;
  };
};

export default getArrDataAnnualTaxDeductions;
