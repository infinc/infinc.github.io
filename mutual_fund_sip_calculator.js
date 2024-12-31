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
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Monthly Investment Amount:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">₹ ${monthlyInvestment.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Annual Return Rate:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${rate} %</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Investment Period:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${time} years</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Total Investment:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">₹ ${totalInvestment.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Total Returns:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${formattedReturns}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Future Value:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${formattedFutureValue}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Initialize with default values
  formatCurrency({ target: monthlyInvestmentInput });
  calculateReturns();
});
