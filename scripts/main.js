
let basket = {};

const basketCounterEl = document.querySelector('.header-link.cart span');
const openBasketBtn = document.querySelector('.header-link.cart');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

openBasketBtn.addEventListener('mouseover', function () {
    basketEl.classList.toggle('hidden');
})

function increaseProductsCount() {
    basketCounterEl.textContent++;
}
function renderNewProductInBasket(productId) {
    let productRow = `      
    <div class="basketRow ">
        <div>${products[productId].name}</div>
    <div><span class="productCount" data-productId="${productId}">1</span>шт. </div>
    <div>$${products[productId].price}</div>
    <div>$<span class="productTotalRow" data-productId="${productId}">${products[productId].price}</span></div>
</div>`;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}
function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * products[productId].price).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}
function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * products[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}

function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInBasket(productId);
    }
}

function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1
    } else {
        basket[productId]++;
    }
}

function addProductIntoBasket(productId) {
    increaseProductsCount();
    addProductToObject(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}
