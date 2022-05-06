export function getCartElements() {
    return Object.values(JSON.parse(localStorage.getItem('cart')));
  }

export function countTotalQty() {
    const qty = getCartElements().reduce((acc, { count }) => acc + count, 0);
    return qty;
  }

export function setTotalQty() {
    showCartCount(countTotalQty());
    localStorage.setItem('totalQty', JSON.stringify(countTotalQty()));
  }

export function showCartCount(qty) {
  const cartCount = document.querySelector('.header__counter');
  cartCount.textContent = qty;

  if (qty) {
    cartCount.classList.add('header__counter_visible');
  } else {
    cartCount.classList.remove('header__counter_visible');
  }
}
