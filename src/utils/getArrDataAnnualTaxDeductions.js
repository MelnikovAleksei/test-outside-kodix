const DEFAULT_VALUE_OF_PROPERTY = 3000000;
const DEFAULT_VALUE_OF_PROPERTY_LIMITER = 2000000;
const MAXIMUM_TAX_DEDUCTION = 260000;
const TAX_DEDUCTION_PERCENTAGE = 0.13;

const NUMBER_OF_MOUNTHS_OF_YEAR = 12;

const getArrDataAnnualTaxDeductions = (
  monthlySalary,
  propertyValue = DEFAULT_VALUE_OF_PROPERTY,
  propertyValueLimiter = DEFAULT_VALUE_OF_PROPERTY_LIMITER,
  maxTaxDeduction = MAXIMUM_TAX_DEDUCTION,
) => {
  const arrWithCalcData = [];

  const taxDeductionPerYear = (monthlySalary * NUMBER_OF_MOUNTHS_OF_YEAR) * TAX_DEDUCTION_PERCENTAGE;

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
