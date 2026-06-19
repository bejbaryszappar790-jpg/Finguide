export function calculateTax(body) {
  const revenue = readMoney(body.revenue);
  const expenses = readMoney(body.expenses);
  const vatRate = readRate(body.vatRate);
  const profitTaxRate = readRate(body.profitTaxRate);

  const vat = revenue * vatRate;
  const taxableProfit = Math.max(revenue - vat - expenses, 0);
  const profitTax = taxableProfit * profitTaxRate;
  const netProfit = revenue - expenses - vat - profitTax;
  const margin = revenue > 0 ? netProfit / revenue : 0;

  return {
    revenue,
    expenses,
    vat,
    profitTax,
    netProfit,
    margin,
    warnings: buildWarnings({ revenue, expenses, margin, netProfit }),
  };
}

function readMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throwApiError("Money values must be non-negative numbers");
  return number;
}

function readRate(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > 1) {
    throwApiError("Rates must be numbers from 0 to 1");
  }
  return number;
}

function buildWarnings({ revenue, expenses, margin, netProfit }) {
  const warnings = [];
  if (expenses > revenue) warnings.push("expenses_exceed_revenue");
  if (netProfit < 0) warnings.push("negative_net_profit");
  if (revenue > 0 && margin < 0.1) warnings.push("low_margin");
  return warnings;
}

function throwApiError(message) {
  const error = new Error(message);
  error.status = 400;
  error.code = "invalid_business_input";
  throw error;
}
