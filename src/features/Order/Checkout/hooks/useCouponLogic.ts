import { CartItemList } from '@/features/Cart/types/Cart.types';

import { CouponResponse } from '../type/coupon.type';
import {
  calculateBOGODiscount,
  getAvailableCoupons,
  getDiscountAmount,
  getOptimalCoupons,
} from '../utils/calculateCoupons';
import { getCouponDisableStatus } from '../utils/couponDisable';

export const getAvailableOptimalCoupons = (
  coupons: CouponResponse[],
  cartItems: CartItemList['cartItems'],
  totalPrice: number,
  specialDeliveryZone: boolean
) => {
  const availableCoupons = getAvailableCoupons({
    coupons,
    totalPrice,
    cartItems,
  });

  return getOptimalCoupons({
    availableCoupons: availableCoupons,
    totalPrice,
    cartItems,
    specialDeliveryZone,
  });
};

export const getCouponDiscount = (
  selectedCoupons: CouponResponse[],
  cartItems: CartItemList['cartItems'],
  totalPrice: number,
  specialDeliveryZone: boolean
) => {
  return selectedCoupons.reduce((total, coupon) => {
    return (
      total +
      getDiscountAmount(coupon, totalPrice, calculateBOGODiscount(cartItems), specialDeliveryZone)
    );
  }, 0);
};

export const isCouponDisabled = (
  coupon: CouponResponse,
  cartItems: CartItemList['cartItems'],
  totalPrice: number,
  specialDeliveryZone: boolean
) => {
  return getCouponDisableStatus(coupon, totalPrice, cartItems, specialDeliveryZone) ?? false;
};
