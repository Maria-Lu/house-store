import '../pages/index.css';
import { showCartCount } from '../utils/utils';

window.addEventListener('pageshow', function () {
    const cartQty = JSON.parse(localStorage.getItem('totalQty'));
    showCartCount(cartQty);
  });
