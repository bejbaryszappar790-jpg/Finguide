const apiBase = "";

const copy = {
  ru: {
    titles: { chat: "AI чат", business: "Бизнес партнер", mentor: "Финансовый ментор" },
    welcome: {
      general:
        "Привет! Я универсальный AI ассистент Finguide. Могу помочь разобрать идею, составить план, объяснить финансовые понятия и подготовить список действий.",
      business:
        "Я ваш AI бизнес партнер. Могу посчитать примерные налоги, НДС, маржу, cash flow и подсказать, какие вопросы задать бухгалтеру или команде.",
      mentor:
        "Я финансовый ментор. Помогу стабилизировать бюджет, закрывать долги, копить на цели и прокачивать финансовую грамотность шаг за шагом.",
    },
    aiError:
      "Ошибка авторизации Groq API. Проверьте правильность ключа GROQ_API_KEY в переменной окружения",
    thinking: "AI думает...",
    auth: {
      account: "Аккаунт",
      login: "Вход",
      register: "Регистрация",
      submitLogin: "Войти",
      submitRegister: "Создать аккаунт",
      guest: "Гость",
      needLogin: "Войдите в аккаунт",
      logout: "Выйти",
      name: "Имя",
      email: "Email",
      password: "Пароль",
      invalid: "Введите email и пароль от 4 символов.",
      nameRequired: "Введите имя.",
    },
    ui: {
      "nav.chat": "AI чат",
      "nav.business": "Бизнес партнер",
      "nav.mentor": "Финансовый ментор",
      "top.eyebrow": "MVP workspace",
      "top.reset": "Сброс",
      "actions.send": "Отправить",
      "chat.heading": "Универсальный ассистент",
      "chat.description": "Задавайте вопросы по финансам, бизнесу, планированию и решениям.",
      "chat.placeholder": "Например: как составить финансовый план на месяц?",
      "chat.quick": "Быстрые сценарии",
      "prompts.launch": "Сделай план запуска малого бизнеса",
      "prompts.vat": "Объясни НДС простыми словами",
      "prompts.costs": "Как сократить расходы без стресса?",
      "business.heading": "AI бизнес партнер",
      "business.description": "Помогает предпринимателям с налогами, НДС, юнит-экономикой и операционными решениями.",
      "business.placeholder": "Например: проверь, выгодна ли маржа 18%",
      "business.calcTitle": "Расчет налогов и НДС",
      "business.calcDescription": "Демо-калькулятор для быстрой оценки.",
      "business.revenue": "Выручка",
      "business.expenses": "Расходы",
      "business.vatRate": "Ставка НДС, %",
      "business.profitTaxRate": "Налог с прибыли, %",
      "business.vat": "НДС",
      "business.tax": "Налог",
      "business.net": "Чистая прибыль",
      "business.margin": "Маржа",
      "mentor.planTitle": "Личный финансовый план",
      "mentor.planDescription": "Введите базовые цифры, чтобы ментор дал рекомендации.",
      "mentor.income": "Доход в месяц",
      "mentor.expenses": "Расходы в месяц",
      "mentor.debt": "Долги",
      "mentor.goal": "Цель накоплений",
      "mentor.heading": "AI финансовый ментор",
      "mentor.description": "Помогает физическим лицам стабилизировать бюджет и повысить финансовую грамотность.",
      "mentor.placeholder": "Например: помоги выбрать стратегию закрытия долгов",
      "auth.account": "Аккаунт",
      "auth.name": "Имя",
      "auth.email": "Email",
      "auth.password": "Пароль",
    },
    planner: {
      freeCash: "Свободный денежный поток",
      reserve: "Резерв безопасности",
      debts: "Долги",
      goal: "Цель",
      negative: "Нужен срочный аудит расходов.",
      base: "Это база для накоплений и закрытия долгов.",
      noDebts: "Долгов нет — можно усилить резерв и инвестиционную дисциплину.",
      months: "мес.",
      reduce: "нужно снизить расходы",
    },
  },
  en: {
    titles: { chat: "AI Chat", business: "Business Partner", mentor: "Financial Mentor" },
    welcome: {
      general:
        "Hello! I am Finguide's universal AI assistant. I can help analyze your ideas, create plans, explain financial concepts, and prepare action lists.",
      business:
        "I am your AI business partner. I can calculate estimated taxes, VAT, margins, cash flow, and suggest questions for your accountant or team.",
      mentor:
        "I am a financial mentor. I will help you stabilize your budget, pay off debts, save for goals, and improve your financial literacy step by step.",
    },
    aiError:
      "Groq API authorization error. Check that GROQ_API_KEY is correct in environment variables",
    thinking: "AI is thinking...",
    auth: {
      account: "Account",
      login: "Log in",
      register: "Register",
      submitLogin: "Sign In",
      submitRegister: "Create Account",
      guest: "Guest",
      needLogin: "Log in to your account",
      logout: "Log out",
      name: "Name",
      email: "Email",
      password: "Password",
      invalid: "Enter email and a password of at least 4 characters.",
      nameRequired: "Enter your name.",
    },
    ui: {
      "nav.chat": "AI Chat",
      "nav.business": "Business Partner",
      "nav.mentor": "Financial Mentor",
      "top.eyebrow": "MVP Workspace",
      "top.reset": "Reset",
      "actions.send": "Send",
      "chat.heading": "Universal Assistant",
      "chat.description": "Ask questions about finance, business, planning, and decisions.",
      "chat.placeholder": "For example: how to create a monthly financial plan?",
      "chat.quick": "Quick Scenarios",
      "prompts.launch": "Make a launch plan for a small business",
      "prompts.vat": "Explain VAT in simple terms",
      "prompts.costs": "How to reduce expenses without stress?",
      "business.heading": "AI Business Partner",
      "business.description": "Helps entrepreneurs with taxes, VAT, unit economics, and operational decisions.",
      "business.placeholder": "For example: check if an 18% margin is profitable",
      "business.calcTitle": "Tax and VAT Calculation",
      "business.calcDescription": "MVP calculator for quick estimation.",
      "business.revenue": "Revenue",
      "business.expenses": "Expenses",
      "business.vatRate": "VAT Rate, %",
      "business.profitTaxRate": "Profit Tax Rate, %",
      "business.vat": "VAT",
      "business.tax": "Tax",
      "business.net": "Net Profit",
      "business.margin": "Margin",
      "mentor.planTitle": "Personal Financial Plan",
      "mentor.planDescription": "Enter basic numbers so the mentor can provide recommendations.",
      "mentor.income": "Monthly Income",
      "mentor.expenses": "Monthly Expenses",
      "mentor.debt": "Debts",
      "mentor.goal": "Savings Goal",
      "mentor.heading": "AI Financial Mentor",
      "mentor.description": "Helps individuals stabilize budgets and improve financial literacy.",
      "mentor.placeholder": "For example: help me choose a debt payoff strategy",
      "auth.account": "Account",
      "auth.name": "Name",
      "auth.email": "Email",
      "auth.password": "Password",
    },
    planner: {
      freeCash: "Free Cash Flow",
      reserve: "Emergency Fund",
      debts: "Debts",
      goal: "Goal",
      negative: "Urgent expense audit needed.",
      base: "This is the foundation for savings and debt payoff.",
      noDebts: "No debts — you can strengthen your reserve and investment discipline.",
      months: "mo.",
      reduce: "need to reduce expenses",
    },
  },
};

const state = {
  view: "chat",
  authMode: "login",
  language: localStorage.getItem("finguide:language") || "ru",
  user: JSON.parse(localStorage.getItem("finguide:user") || "null"),
  token: localStorage.getItem("finguide:token") || "",
  messages: JSON.parse(localStorage.getItem("finguide:messages") || "{}"),
};

const agents = {
  general: { storage: "generalMessages" },
  business: { storage: "businessMessages" },
  mentor: { storage: "mentorMessages" },
};

const formatMoney = (value) =>
  new Intl.NumberFormat(state.language === "en" ? "en-US" : "ru-RU", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

async function api(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "API request failed");
    error.payload = payload;
    throw error;
  }
  return payload;
}

function saveState() {
  localStorage.setItem("finguide:messages", JSON.stringify(state.messages));
  localStorage.setItem("finguide:language", state.language);
  if (state.user) {
    localStorage.setItem("finguide:user", JSON.stringify(state.user));
    localStorage.setItem("finguide:token", state.token);
  } else {
    localStorage.removeItem("finguide:user");
    localStorage.removeItem("finguide:token");
  }
}

function initMessages() {
  Object.keys(agents).forEach((agent) => {
    if (!state.messages[agent] || !state.messages[agent].length) {
      state.messages[agent] = [{ role: "ai", text: copy[state.language].welcome[agent] }];
    }
    renderMessages(agent);
  });
}

function renderMessages(agent) {
  const container = document.getElementById(agents[agent].storage);
  container.innerHTML = "";
  state.messages[agent].forEach((message) => {
    const wrapper = document.createElement("div");
    wrapper.className = `message-wrapper ${message.role}`;
    
    const avatar = document.createElement("div");
    avatar.className = "avatar-box";
    avatar.innerHTML = message.role === "user" 
      ? `<i data-lucide="user"></i>` 
      : `<i data-lucide="bot"></i>`;

    const bubble = document.createElement("div");
    bubble.className = `message ${message.role}${message.status ? ` ${message.status}` : ""}`;
    
    if (message.status === "loading") {
      bubble.innerHTML = `
        <div class="typing-skeleton">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      `;
    } else {
      bubble.textContent = message.text;
    }
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    container.appendChild(wrapper);
  });
  if (window.lucide) window.lucide.createIcons();
  
  // Auto-scroll to bottom after render — requestAnimationFrame ensures layout is complete
  requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
}

function addMessage(agent, role, text, status = "") {
  const message = { role, text, status };
  state.messages[agent].push(message);
  saveState();
  renderMessages(agent);
  return message;
}

async function requestAi(agent, value) {
  const form = document.querySelector(`.message-form[data-agent="${agent}"]`);
  if (form) {
    form.elements.message.disabled = true;
    form.querySelector('button[type="submit"]').disabled = true;
  }
  const loading = addMessage(agent, "ai", copy[state.language].thinking, "loading");
  try {
    const payload = await api("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        agent,
        language: state.language,
        message: value,
        history: state.messages[agent].filter((message) => message !== loading),
        context: collectContext(agent),
      }),
    });
    loading.text = payload.answer;
    loading.status = "";
  } catch (error) {
    loading.text = `${copy[state.language].aiError}\n${error.message}`;
    loading.status = "error";
  } finally {
    if (form) {
      form.elements.message.disabled = false;
      form.querySelector('button[type="submit"]').disabled = false;
      form.elements.message.focus();
    }
  }
  saveState();
  renderMessages(agent);
}

function collectContext(agent) {
  if (agent === "business") {
    return {
      revenue: Number(document.getElementById("revenueInput").value) || 0,
      expenses: Number(document.getElementById("expensesInput").value) || 0,
      vatRate: (Number(document.getElementById("vatInput").value) || 0) / 100,
      profitTaxRate: (Number(document.getElementById("profitTaxInput").value) || 0) / 100,
    };
  }
  if (agent === "mentor") {
    return {
      income: Number(document.getElementById("incomeInput").value) || 0,
      expenses: Number(document.getElementById("personalExpensesInput").value) || 0,
      debt: Number(document.getElementById("debtInput").value) || 0,
      goal: Number(document.getElementById("goalInput").value) || 0,
    };
  }
  return {};
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const agent = form.dataset.agent;
  const input = form.elements.message;
  const value = input.value.trim();
  if (!value) return;

  addMessage(agent, "user", value);
  input.value = "";
  requestAi(agent, value);
}

function setView(view) {
  state.view = view;
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    const isActive = section.id === `${view}View`;
    section.classList.toggle("active", isActive);
  });
  document.getElementById("pageTitle").textContent = copy[state.language].titles[view];
}

function setLanguage(language) {
  state.language = language;
  document.documentElement.lang = language === "en" ? "en" : "ru";
  applyTranslations();
  document.querySelectorAll(".language-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.language === language);
  });
  Object.keys(agents).forEach((agent) => {
    if (state.messages[agent]?.length === 1 && state.messages[agent][0].role === "ai") {
      state.messages[agent][0].text = copy[language].welcome[agent];
    }
    renderMessages(agent);
  });
  renderUser();
  setAuthMode(state.authMode);
  setView(state.view);
  calculateBusiness();
  renderPlan();
  saveState();
}

function applyTranslations() {
  const dictionary = copy[state.language].ui;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    const key = element.dataset.placeholder;
    if (dictionary[key]) element.placeholder = dictionary[key];
  });
  document.getElementById("clearDataBtn").title =
    state.language === "en" ? "Clear demo data" : "Очистить демо-данные";
}

function renderUser() {
  const t = copy[state.language].auth;
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const authOpenBtn = document.getElementById("authOpenBtn");
  const dot = document.querySelector(".status-dot");

  if (state.user) {
    profileName.textContent = state.user.name;
    profileEmail.textContent = state.user.email;
    authOpenBtn.textContent = t.logout;
    dot.classList.add("online");
  } else {
    profileName.textContent = t.guest;
    profileEmail.textContent = t.needLogin;
    authOpenBtn.textContent = t.login;
    dot.classList.remove("online");
  }
}

function setAuthMode(mode) {
  state.authMode = mode;
  const t = copy[state.language].auth;
  document.getElementById("authTitle").textContent = mode === "login" ? t.login : t.register;
  document.getElementById("authSubmit").textContent = mode === "login" ? t.submitLogin : t.submitRegister;
  document.querySelector(".name-field").classList.toggle("hidden", mode === "login");
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
    tab.textContent = tab.dataset.mode === "login" ? t.login : t.register;
  });
  document.getElementById("authError").textContent = "";
}

async function handleAuth(event) {
  event.preventDefault();
  const t = copy[state.language].auth;
  const name = document.getElementById("nameField").value.trim();
  const email = document.getElementById("emailField").value.trim().toLowerCase();
  const password = document.getElementById("passwordField").value;
  const error = document.getElementById("authError");

  if (!email || password.length < 4) {
    error.textContent = t.invalid;
    return;
  }
  if (state.authMode === "register" && !name) {
    error.textContent = t.nameRequired;
    return;
  }

  try {
    const payload = await api(`/api/auth/${state.authMode === "register" ? "register" : "login"}`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    state.user = payload.user;
    state.token = payload.token;
    saveState();
    renderUser();
    document.getElementById("authModal").close();
  } catch (authError) {
    error.textContent = authError.message;
  }
}

async function calculateBusiness() {
  try {
    const revenue = Number(document.getElementById("revenueInput").value) || 0;
    const payload = await api("/api/business/tax", {
      method: "POST",
      body: JSON.stringify({
        revenue: revenue,
        expenses: Number(document.getElementById("expensesInput").value) || 0,
        vatRate: (Number(document.getElementById("vatInput").value) || 0) / 100,
        profitTaxRate: (Number(document.getElementById("profitTaxInput").value) || 0) / 100,
      }),
    });

    document.getElementById("vatResult").textContent = formatMoney(payload.vat);
    document.getElementById("taxResult").textContent = formatMoney(payload.profitTax);
    document.getElementById("netResult").textContent = formatMoney(payload.netProfit);
    document.getElementById("marginResult").textContent = formatPercent(payload.margin);

    const vatPct = revenue > 0 ? (payload.vat / revenue) * 100 : 0;
    const taxPct = revenue > 0 ? (payload.profitTax / revenue) * 100 : 0;
    const netPct = revenue > 0 ? (payload.netProfit / revenue) * 100 : 0;
    
    document.getElementById("vatBar").style.width = `${Math.min(vatPct, 100)}%`;
    document.getElementById("taxBar").style.width = `${Math.min(taxPct, 100)}%`;
    document.getElementById("netBar").style.width = `${Math.min(netPct, 100)}%`;
    document.getElementById("marginBar").style.width = `${Math.min(payload.margin * 100, 100)}%`;
  } catch {
    document.getElementById("vatResult").textContent = "API";
    document.getElementById("taxResult").textContent = "API";
    document.getElementById("netResult").textContent = "API";
    document.getElementById("marginResult").textContent = "API";
  }
}

async function renderPlan() {
  const t = copy[state.language].planner;
  try {
    const payload = await api("/api/mentor/plan", {
      method: "POST",
      body: JSON.stringify({
        income: Number(document.getElementById("incomeInput").value) || 0,
        expenses: Number(document.getElementById("personalExpensesInput").value) || 0,
        debt: Number(document.getElementById("debtInput").value) || 0,
        goal: Number(document.getElementById("goalInput").value) || 0,
      }),
    });

    const monthsText = payload.monthsToGoal ? `${payload.monthsToGoal} ${t.months}` : t.reduce;
    document.getElementById("planOutput").innerHTML = `
      <div class="plan-step"><strong>${t.freeCash}</strong>${formatMoney(payload.freeCashFlow)}. ${payload.freeCashFlow < 0 ? t.negative : t.base}</div>
      <div class="plan-step"><strong>${t.reserve}</strong>${formatMoney(payload.reserveTarget)}</div>
      <div class="plan-step"><strong>${t.debts}</strong>${payload.debt > 0 ? formatMoney(payload.debtPayment) : t.noDebts}</div>
      <div class="plan-step"><strong>${t.goal}</strong>${formatMoney(payload.monthlySaving)} / ${monthsText}</div>
    `;
  } catch {
    document.getElementById("planOutput").innerHTML = `<div class="plan-step"><strong>API</strong>${copy[state.language].aiError}</div>`;
  }
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".language-btn").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

document.querySelectorAll(".message-form").forEach((form) => {
  form.addEventListener("submit", handleMessageSubmit);
});

document.querySelectorAll(".prompt-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const agent = chip.dataset.agent;
    const text = chip.textContent.trim();
    addMessage(agent, "user", text);
    requestAi(agent, text);
  });
});

document.getElementById("authOpenBtn").addEventListener("click", () => {
  if (state.user) {
    state.user = null;
    state.token = "";
    saveState();
    renderUser();
    return;
  }
  document.getElementById("authModal").showModal();
});

document.getElementById("authCloseBtn").addEventListener("click", () => {
  document.getElementById("authModal").close();
});

document.querySelectorAll(".auth-tab").forEach((tab) => {
  tab.addEventListener("click", () => setAuthMode(tab.dataset.mode));
});

document.getElementById("authForm").addEventListener("submit", handleAuth);

document.getElementById("clearDataBtn").addEventListener("click", () => {
  localStorage.removeItem("finguide:user");
  localStorage.removeItem("finguide:token");
  localStorage.removeItem("finguide:language");
  localStorage.removeItem("finguide:messages");
  window.location.reload();
});

["revenueInput", "expensesInput", "vatInput", "profitTaxInput"].forEach((id) => {
  document.getElementById(id).addEventListener("input", calculateBusiness);
});

["incomeInput", "personalExpensesInput", "debtInput", "goalInput"].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderPlan);
});

initMessages();
setLanguage(state.language);

// Landing Page Logic
function openWorkspace() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("appShell").style.display = "grid";
  if (window.lucide) window.lucide.createIcons();
}

function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = `${prefix}${Math.round(current).toLocaleString("ru-RU")}${suffix}`;
    }, stepTime);
  });
}

function updateShowcase() {
  const revenue = Number(document.getElementById("scRevenue").value) || 0;
  const expenses = Number(document.getElementById("scExpenses").value) || 0;
  
  const vatRate = 0.12;
  const profitTaxRate = 0.03;

  const vat = revenue * vatRate;
  const taxableProfit = Math.max(revenue - vat - expenses, 0);
  const tax = taxableProfit * profitTaxRate;
  const net = revenue - vat - expenses - tax;

  const format = (num) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(num);
  
  document.getElementById("scVat").textContent = format(vat);
  document.getElementById("scTax").textContent = format(tax);
  document.getElementById("scNet").textContent = format(net);

  const vatPct = revenue > 0 ? (vat / revenue) * 100 : 0;
  const taxPct = revenue > 0 ? (tax / revenue) * 100 : 0;
  const netPct = revenue > 0 ? (net / revenue) * 100 : 0;

  document.getElementById("scVatBar").style.width = `${Math.min(Math.max(vatPct, 0), 100)}%`;
  document.getElementById("scTaxBar").style.width = `${Math.min(Math.max(taxPct, 0), 100)}%`;
  document.getElementById("scNetBar").style.width = `${Math.min(Math.max(netPct, 0), 100)}%`;
}

// Initialize landing page logic
document.addEventListener("DOMContentLoaded", () => {
  animateCounters();
  updateShowcase();
});

