export function showCartCount(qty) {
  const cartCount = document.querySelector('.header__counter');
  cartCount.textContent = qty;

  if (qty) {
    cartCount.classList.add('header__counter_visible');
  } else {
    cartCount.classList.remove('header__counter_visible');
  }
}
