import { renderProductsList } from './js/products.js';
import { renderCurrentYear } from './js/utils.js';

function initApp() {
  document.addEventListener('DOMContentLoaded', () => {
    const copyrightRef = document.querySelector('.copyright');

    renderCurrentYear(copyrightRef);
    renderProductsList();
  });
}

initApp();
