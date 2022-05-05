import '../pages/index.css';
import { showCartCount } from '../utils/utils';

const cartQty = JSON.parse(localStorage.getItem('totalQty'));
  
showCartCount(cartQty);
