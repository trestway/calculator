const totalCost = document.querySelector('#total-cost');
const initalFee = document.querySelector('#an-initial-fee');
const creditTerm = document.querySelector('#credit-term');

const totalCostRange = document.querySelector('#total-cost-range');
const initalFeeRange = document.querySelector('#an-initial-fee-range');
const creditTermRange = document.querySelector('#credit-term-range');

const totalCredit = document.querySelector('#amount-of-credit');
const totalMonthlyPayment = document.querySelector('#monthly-payment');
const totalRecIncome = document.querySelector('#recommended-income');

const ranges = document.querySelectorAll('.input-range');
const buttonsBanks = document.querySelectorAll('.bank');

const setValue = () => {
  totalCost.value = totalCostRange.value;
  initalFee.value = initalFeeRange.value;
  creditTerm.value = creditTermRange.value;
};

setValue();

const banks = [
  {
    name: 'privat',
    percents: 8.5
  },
  {
    name: 'oschad',
    percents: 7.8
  },
  {
    name: 'ukrgaz',
    percents: 8.1
  }
];

let currentPercent = banks[0].percents;

for (let i = 0; i < buttonsBanks.length; i++) {
  buttonsBanks[i].addEventListener("click", () => {
    for (let i = 0; i < buttonsBanks.length; i++) {
      buttonsBanks[i].classList.remove('active');
    }
    activeBank(buttonsBanks[i]);
    buttonsBanks[i].classList.add('active');
  });
}

const activeBank = activeButton => {
  const dataValue = activeButton.dataset.name;
  const currentBank = banks.find(bank => bank.name === dataValue);
  currentPercent = currentBank.percents;
  calc(totalCost.value, initalFee.value, creditTerm.value);
};

for (let i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener("input", () => {
    setValue();
    calc(totalCost.value, initalFee.value, creditTerm.value);
  });
}

const calc = (totalCost = 0, initalFee = 50000, creditTerm = 1) => {
  let amountLoan = totalCost - initalFee;
  let interestRate = currentPercent;
  let amountMonth = 12 * creditTerm;

  let monthlyPayment = (amountLoan + (((amountLoan / 100) * interestRate) / 12) * amountMonth) / amountMonth;
  let monthlyPaymentRound = Math.round(monthlyPayment);
  let recIncome = Math.round(monthlyPayment + ((monthlyPayment * 35) / 100));

  if (monthlyPaymentRound < 0) {
    return false;
  } else {
    totalCredit.innerHTML = `${amountLoan} ₴`;
    totalMonthlyPayment.innerHTML = `${monthlyPaymentRound} ₴`;
    totalRecIncome.innerHTML = `${recIncome} ₴`
  }
};


