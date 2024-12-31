document.addEventListener('DOMContentLoaded', function() {
  const monthlyInvestmentInput = document.getElementById('monthly-investment');
  const rateInput = document.getElementById('rate');
  const timeInput = document.getElementById('time');
  const resultTable = document.getElementById('result-table');

  monthlyInvestmentInput.addEventListener('input', formatCurrency);
  rateInput.addEventListener('input', calculateReturns);
  timeInput.addEventListener('input', calculateReturns);

  function formatCurrency(event) {
    const value = event.target.value.replace(/[^\d]/g, '');
    if (value) {
      const formattedValue = new Intl.NumberFormat('en-IN').format(value);
      event.target.value = formattedValue;
    } else {
      event.target.value = '';
    }
    calculateReturns();
  }

  function calculateReturns() {
    const monthlyInvestment = parseFloat(monthlyInvestmentInput.value.replace(/,/g, ''));
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);

    if (isNaN(monthlyInvestment) || isNaN(rate) || isNaN(time)) {
      resultTable.innerHTML = 'Please enter valid numbers for all fields.';
      return;
    }

    const n = time * 12;
    const r = rate / 100 / 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = monthlyInvestment * n;
    const totalReturns = futureValue - totalInvestment;
    const formattedReturns = totalReturns.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const formattedFutureValue = futureValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    resultTable.innerHTML = `
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <tbody>
          <tr>
            <td class="px-4 py-2 text-left">Monthly Investment Amount:</td>
            <td class="px-4 py-2 text-right">₹ ${monthlyInvestment.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-left">Annual Return Rate:</td>
            <td class="px-4 py-2 text-right">${rate} %</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-left">Investment Period:</td>
            <td class="px-4 py-2 text-right">${time} years</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-left">Total Investment:</td>
            <td class="px-4 py-2 text-right">₹ ${totalInvestment.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-left">Total Returns:</td>
            <td class="px-4 py-2 text-right">${formattedReturns}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-left">Future Value:</td>
            <td class="px-4 py-2 text-right">${formattedFutureValue}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Initialize with default values
  formatCurrency({ target: monthlyInvestmentInput });
  calculateReturns();
});
