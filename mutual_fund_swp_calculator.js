document.addEventListener('DOMContentLoaded', function() {
  const initialInvestmentInput = document.getElementById('initial-investment');
  const monthlyWithdrawalInput = document.getElementById('monthly-withdrawal');
  const rateInput = document.getElementById('rate');
  const timeInput = document.getElementById('time');
  const resultTable = document.getElementById('result-table');

  initialInvestmentInput.addEventListener('input', formatCurrency);
  monthlyWithdrawalInput.addEventListener('input', formatCurrency);
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
    const initialInvestment = parseFloat(initialInvestmentInput.value.replace(/,/g, ''));
    const monthlyWithdrawal = parseFloat(monthlyWithdrawalInput.value.replace(/,/g, ''));
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);

    if (isNaN(initialInvestment) || isNaN(monthlyWithdrawal) || isNaN(rate) || isNaN(time)) {
      resultTable.innerHTML = 'Please enter valid numbers for all fields.';
      return;
    }

    const n = time * 12;
    const r = rate / 100 / 12;
    let remainingBalance = initialInvestment;
    let totalWithdrawn = 0;

    for (let i = 1; i <= n; i++) {
      remainingBalance = remainingBalance * (1 + r) - monthlyWithdrawal;
      totalWithdrawn += monthlyWithdrawal;
    }

    const formattedRemainingBalance = remainingBalance.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const formattedTotalWithdrawn = totalWithdrawn.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    resultTable.innerHTML = `
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <tbody>
          <tr>
            <td class="px-4 text-gray-500 dark:text-gray-400 text-left text-sm">Initial Investment Amount:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">₹ ${initialInvestment.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-500 dark:text-gray-400 text-left text-sm">Monthly Withdrawal Amount:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">₹ ${monthlyWithdrawal.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-500 dark:text-gray-400 text-left text-sm">Annual Return Rate:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${rate} %</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-500 dark:text-gray-400 text-left text-sm">Investment Period:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${time} years</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-500 dark:text-gray-400 text-left text-sm">Total Withdrawn:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${formattedTotalWithdrawn}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-500 dark:text-gray-400 text-left text-sm">Remaining Balance:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${formattedRemainingBalance}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Initialize with default values
  formatCurrency({ target: initialInvestmentInput });
  formatCurrency({ target: monthlyWithdrawalInput });
  calculateReturns();
});
