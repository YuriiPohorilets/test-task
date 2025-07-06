import { getBrowserName } from './utils.js';

function renderErrorStatus(container) {
  const errorElement = document.createElement('span');
  errorElement.className = 'status status--error';
  errorElement.textContent = 'Something went wrong!';

  container.appendChild(errorElement);
}

function renderLoadingStatus(container) {
  const errorElement = document.createElement('span');
  errorElement.className = 'status status--loading';
  errorElement.textContent = 'Loading...';

  container.appendChild(errorElement);
}

function renderDownloadedArrow(autocloseDelay = 4000) {
  const arrow = document.querySelector('.downloaded-arrow');

  const browser = getBrowserName();

  if (browser === 'firefox' || browser === 'safari') {
    arrow.classList.add('downloaded-arrow--top-end');
  } else {
    arrow.classList.add('downloaded-arrow--bottom-start');
  }

  arrow.classList.add('visible');

  setTimeout(() => {
    arrow.classList.remove('visible');
  }, autocloseDelay);
}

function removeElementBySelector(container, selector) {
  container.querySelector(selector)?.remove();
}

export { renderErrorStatus, renderLoadingStatus, removeElementBySelector, renderDownloadedArrow };
