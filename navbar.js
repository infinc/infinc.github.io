document.addEventListener('DOMContentLoaded', function () {
  
  const NavBarHtmlElement = 
`<header class="absolute inset-x-0 top-0 z-50">
  <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <a href="index.html" class="flex items-center gap-x-5 -m-1.5 p-1.5">
        <!-- Reserve space for the image -->
        <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" style="width: 32px; height: 32px;">
        <label class="text-lg font-semibold text-gray-900 dark:text-white pr-5 sm:text-xl">The Indian Finance Company</label>
      </a>
    </div>
    <div class="flex items-center">
      <!-- Dark Mode Switch -->
      <label for="dark-mode-toggle" class="flex items-center cursor-pointer">
        <div class="relative">
          <input type="checkbox" id="dark-mode-toggle" class="sr-only" onclick="toggleDarkMode()">
          <div class="block bg-gray-400 dark:bg-gray-700 w-10 h-6 rounded-full"></div>
          <div id="toggle-dot" class="dot absolute left-1 top-1 bg-white dark:bg-gray-800 w-4 h-4 rounded-full transition transform"></div>
        </div>
        <span class="ml-3 text-gray-900 dark:text-white">Dark Mode</span>
      </label>
    </div>
  </nav>
</header>`;

  document.getElementById("navbar").innerHTML = NavBarHtmlElement;
});
