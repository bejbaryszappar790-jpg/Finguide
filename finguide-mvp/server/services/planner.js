export function createPersonalPlan(body) {
  const income = readMoney(body.income);
  const expenses = readMoney(body.expenses);
  const debt = readMoney(body.debt);
  const goal = readMoney(body.goal);

  const freeCashFlow = income - expenses;
  const reserveTarget = expenses * 3;
  const debtPayment = Math.max(freeCashFlow * 0.35, 0);
  const monthlySaving = Math.max(freeCashFlow * 0.5, 0);
  const monthsToGoal = monthlySaving > 0 && goal > 0 ? Math.ceil(goal / monthlySaving) : null;

  return {
    income,
    expenses,
    debt,
    goal,
    freeCashFlow,
    reserveTarget,
    debtPayment,
    monthlySaving,
    monthsToGoal,
    riskLevel: getRiskLevel({ freeCashFlow, expenses, debt }),
    steps: buildSteps({ freeCashFlow, reserveTarget, debt, debtPayment, monthlySaving, monthsToGoal }),
  };
}

function buildSteps({ freeCashFlow, reserveTarget, debt, debtPayment, monthlySaving, monthsToGoal }) {
  const steps = [];
  if (freeCashFlow < 0) {
    steps.push("Сначала сократите расходы или увеличьте доход, потому что денежный поток отрицательный.");
  } else {
    steps.push(`Свободный денежный поток: ${Math.round(freeCashFlow)} KZT в месяц.`);
  }
  steps.push(`Резерв безопасности на 3 месяца: ${Math.round(reserveTarget)} KZT.`);
  if (debt > 0) steps.push(`Рекомендуемый платеж по долгам: ${Math.round(debtPayment)} KZT в месяц.`);
  if (monthlySaving > 0) steps.push(`Плановый взнос к цели: ${Math.round(monthlySaving)} KZT в месяц.`);
  if (monthsToGoal) steps.push(`Ориентировочный срок цели: ${monthsToGoal} мес.`);
  return steps;
}

function getRiskLevel({ freeCashFlow, expenses, debt }) {
  if (freeCashFlow < 0) return "high";
  if (debt > expenses * 3) return "medium";
  return "controlled";
}

function readMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    const error = new Error("Planner values must be non-negative numbers");
    error.status = 400;
    error.code = "invalid_planner_input";
    throw error;
  }
  return number;
}
