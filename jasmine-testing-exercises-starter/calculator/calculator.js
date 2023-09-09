window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const DEFAULT = {amount: 0, years: 0, rate: 0};

  document.getElementById("loan-amount").value = DEFAULT.amount;
  document.getElementById("loan-years").value = DEFAULT.years;
  document.getElementById("loan-rate").value = DEFAULT.rate;

  updateMonthly(
    calculateMonthlyPayment(DEFAULT)
  );
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(
    calculateMonthlyPayment(
      getCurrentUIValues()
    )
  );
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const { amount, years, rate } = values;

  const I = rate / 12; //Periodic Interest Rate = Yearly Rate / 12
  const N = years * 12 //Number of Payments = Terms(Years) * 12

  return roundTwoDecimals( (amount * I) / (1 - Math.pow((1 + I), -N)) ); // (P * I) / (1 - (1 + I))^-N
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").textContent = `$${monthly}`;
}

function roundTwoDecimals(n) {
  return Math.round(n * 100) / 100;
}
