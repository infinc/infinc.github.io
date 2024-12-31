document.addEventListener('DOMContentLoaded', function() {
  const principalInput = document.getElementById('principal');
  const rateInput = document.getElementById('rate');
  const timeInput = document.getElementById('time');
  const resultTable = document.getElementById('result-table');

  principalInput.addEventListener('input', formatCurrency);
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
    const principal = parseFloat(principalInput.value.replace(/,/g, ''));
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      resultTable.innerHTML = 'Please enter valid numbers for all fields.';
      return;
    }

    const futureValue = principal * Math.pow((1 + rate / 100), time);
    const totalReturns = futureValue - principal;
    const formattedReturns = totalReturns.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const formattedFutureValue = futureValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    resultTable.innerHTML = `
      <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <tbody>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Principal Amount:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">₹ ${principal.toLocaleString('en-IN')}</td>
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
  formatCurrency({ target: principalInput });
  calculateReturns();
});
