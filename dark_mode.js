// Apply the user's preferred theme before the rest of the page loads
(function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();

// JavaScript for toggling dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  // Save the user's preference in localStorage
  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    document.getElementById('toggle-dot').classList.add('translate-x-full');
    document.getElementById('toggle-dot').classList.remove('translate-x-0');
  } else {
    localStorage.setItem('theme', 'light');
    document.getElementById('toggle-dot').classList.add('translate-x-0');
    document.getElementById('toggle-dot').classList.remove('translate-x-full');
  }
}

// Ensure the toggle state is correct on load
window.onload = function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('dark-mode-toggle').checked = true;
    document.getElementById('toggle-dot').classList.add('translate-x-full');
    document.getElementById('toggle-dot').classList.remove('translate-x-0');
  } else {
    document.getElementById('toggle-dot').classList.add('translate-x-0');
    document.getElementById('toggle-dot').classList.remove('translate-x-full');
  }
}