import { CartItemList } from '../types/Cart.types';

export const cartPrice = ({ cartItems }: CartItemList) => {
  const orderPrice = cartItems
    .filter((item) => item.quantity > 0 && item.isChecked)
    .reduce((acc, cart) => {
      return acc + Number(cart.product.price) * Number(cart.quantity);
    }, 0);

  const deliveryFee = orderPrice >= 100000 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryFee;

  return { orderPrice, deliveryFee, totalPrice };
};
