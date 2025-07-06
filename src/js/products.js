import productService from './api/productService.js';
import { normalizeString, download } from './utils.js';
import {
  renderErrorStatus,
  renderLoadingStatus,
  removeElementBySelector,
  renderDownloadedArrow,
} from './helpers.js';

function handleDownloadClick(link, name) {
  const fileName = `${name}.json`;
  const data = { link };

  download(JSON.stringify(data, null, 2), fileName, 'application/json');
}

function createProductMarkup(product) {
  const { amount, license_name, name_prod, price_key, is_best, link } = product;

  const isDiscount = price_key !== 'test' && price_key !== 'first' && price_key.includes('%');
  const isMonthly = normalizeString(license_name).includes('month');
  const showBadge = is_best || isDiscount;

  const badgeType = is_best ? 'best' : isDiscount ? 'discount' : '';
  const priceValue = Number(amount).toFixed(2);
  const discountPercent = isDiscount ? parseFloat(price_key) : 0;
  const oldPriceValue = isDiscount
    ? ((Number(amount) * 100) / (100 - discountPercent)).toFixed(2)
    : null;
  const badgeText = badgeType === 'best' ? 'Best value' : '';
  const durationText = isMonthly ? 'Mo' : 'Per year';

  return `
    <article class="product">
      <div class="product__thumb">
        <span class="product__price">
          <span class="product__value">$${priceValue}</span>
          <span class="product__duration">${durationText}</span>
        </span>

        ${isDiscount ? `<del class="product__oldValue">$${oldPriceValue}</del>` : ''}

        ${
          showBadge
            ? `<span class="product__badge product__badge--${badgeType}">${badgeText}</span>`
            : ''
        }
      </div>

      <div class="product__info">
        <h2 class="product__title">${name_prod}</h2>
        <span class="product__subtitle">${license_name}</span>
      </div>

      <button type="button" aria-label="Download ${name_prod}" data-link="${link}" data-name="${name_prod}" class="button product__button">Download</button>
    </article>
  `;
}

async function renderProductsList() {
  const containerRef = document.querySelector('.products__wrapper');

  renderLoadingStatus(containerRef);

  try {
    const products = await productService.fetchProducts();

    const productsListMarkup = `
      <ul class="products__list">
        ${products
          .map(product => `<li class="products__item">${createProductMarkup(product)}</li>`)
          .join('')}
      </ul>
    `;

    removeElementBySelector(containerRef, '.status');
    containerRef.insertAdjacentHTML('beforeend', productsListMarkup);

    containerRef.addEventListener('click', e => {
      const button = e.target.closest('.product__button');

      if (!button) return;

      const link = button.dataset.link;
      const name = button.dataset.name;

      handleDownloadClick(link, name);

      setTimeout(() => {
        renderDownloadedArrow();
      }, 1500);
    });
  } catch (error) {
    console.error('Failed to render product list:', error);
    removeElementBySelector(containerRef, '.status');
    renderErrorStatus(containerRef);
  }
}

export { createProductMarkup, renderProductsList };
