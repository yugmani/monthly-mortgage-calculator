// Import stylesheets
import './style.css';

const basePrice = document.getElementById('basePrice');
const downPay = document.getElementById('downPay');
const intRate = document.getElementById('intRate');
const term = document.getElementById('term');
const homeIns = document.getElementById('homeIns');
const propTax = document.getElementById('propTax');
const hoa = document.getElementById('hoa');
const btnCalc = document.getElementById('btn-calc');

function monthlyPI(p, r, n) {
  r = r / 100 / 12;

  n = n * 12;

  let rFactor = (1 + r) ** n;

  const m = (p * (r * rFactor)) / (rFactor - 1);

  return m;
}

function monthlyMortgage(PI, homeIns, propTax, hoa) {
  return PI + homeIns + propTax + hoa;
}

// console.log(monthlyMortgage(PI1, 118.75, 950, 195));
// console.log(monthlyMortgage(PI2, 118.75, 950, 195));

btnCalc.addEventListener('click', displayEstimation);

function displayEstimation() {
  const homeBasePrice = +basePrice.value;
  const downPayment = +downPay.value || 20;
  const rateInt = +intRate.value || 5;
  const termFixed = +term.value || 30;
  const insuranceHome = +homeIns.value || 118.75;
  const propTaxRate = +propTax.value || 2;
  const hoaDues = +hoa.value || 195;

  const netDownPay = calculateDownPayment(downPayment, homeBasePrice);
  const loanAmount = homeBasePrice - netDownPay;
  const PI1 = monthlyPI(loanAmount, rateInt, termFixed);
  const PI2 = PI1.toFixed(4);
  const netPropTax = calculatePropertyTax(propTaxRate, homeBasePrice);
  let mMortgage = monthlyMortgage(PI1, insuranceHome, netPropTax, hoaDues);
  mMortgage = mMortgage.toFixed(4);
  // return mMortgage;

  let html = `
  <table>
  <tr>
    <td>Price of Home:$ ${homeBasePrice}</td>
    <td>Down Payment:$ ${downPayment}</td>
  </tr>

  <tr>
    <td>Loan Amount:$ ${loanAmount}</td>
    <td>Interest Rate: ${rateInt} %</td>
  </tr>
  <tr>
    <td>Term of Loan: ${termFixed} years</td>
    <td>Principal & Interest:<strong>$ ${PI2}</strong></td>
  </tr>
  <tr>
    <td>Homeowners' Insurance:$ ${insuranceHome}</td>
    <td>Property Tax: ${propTaxRate} %</td>
  </tr>
  <tr>
    <td>HOA Dues:$ ${hoaDues}</td>
    <td>Total Monthly Payment:<strong>$ ${mMortgage}</strong></td>
  </tr>
</table>
`;

  document.getElementById('result').innerHTML = html;
}

function calculateDownPayment(rate, baseHome) {
  return (rate * baseHome) / 100;
}

function calculatePropertyTax(propTRate, homeBPrice) {
  return (propTRate * homeBPrice) / (12 * 100);
}
