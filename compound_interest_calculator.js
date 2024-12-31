document.addEventListener('DOMContentLoaded', function() {
  const principalInput = document.getElementById('principal');
  const rateInput = document.getElementById('rate');
  const timeInput = document.getElementById('time');
  const compoundsInput = document.getElementById('compounds');
  const resultTable = document.getElementById('result-table');

  principalInput.addEventListener('input', formatCurrency);
  rateInput.addEventListener('input', calculateInterest);
  timeInput.addEventListener('input', calculateInterest);
  compoundsInput.addEventListener('input', calculateInterest);

  function formatCurrency(event) {
    const value = event.target.value.replace(/[^\d]/g, '');
    if (value) {
      const formattedValue = new Intl.NumberFormat('en-IN').format(value);
      event.target.value = formattedValue;
    } else {
      event.target.value = '';
    }
    calculateInterest();
  }

  function calculateInterest() {
    const principal = parseFloat(principalInput.value.replace(/,/g, ''));
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);
    const compounds = parseFloat(compoundsInput.value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(compounds)) {
      resultTable.innerHTML = 'Please enter valid numbers for all fields.';
      return;
    }

    const compoundInterest = principal * Math.pow((1 + (rate / (compounds * 100))), compounds * time) - principal;
    const totalAmount = principal + compoundInterest;
    const formattedInterest = compoundInterest.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const formattedTotalAmount = totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

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
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Annual Interest Rate:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${rate} %</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Time:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${time} years</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Compounds per Year:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${compounds}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Compound Interest:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${formattedInterest}</td>
          </tr>
          <tr>
            <td class="px-4 text-gray-600 dark:text-gray-400 text-left text-sm">Total Amount:</td>
          </tr>
          <tr>
            <td class="px-4 text-left">${formattedTotalAmount}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Initialize with default values
  formatCurrency({ target: principalInput });
  calculateInterest();
});
