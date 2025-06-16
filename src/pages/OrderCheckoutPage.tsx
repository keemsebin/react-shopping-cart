import { useLocation } from 'react-router-dom';

import { getCoupons } from '@/api/order';
import { OrderCheckout } from '@/features/Order/Checkout/components/OrderCheckout';
import { CouponResponse } from '@/features/Order/Checkout/type/coupon.type';
import { isCartItemArray } from '@/features/Order/Checkout/utils/isCartItemArray';
import { EmptyOrder } from '@/features/Order/Confirm/components/EmptyOrder';
import { useFetchData } from '@/shared/hooks/useFetchData';

export const OrderCheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state;
  const { data: coupons, isInitialLoading } = useFetchData<CouponResponse[]>({
    autoFetch: getCoupons,
  });

  if (!isCartItemArray(cartItems)) {
    return <EmptyOrder />;
  }

  if (isInitialLoading) {
    return <div>로딩 중...</div>;
  }

  return <OrderCheckout cartItems={cartItems} coupons={coupons ?? []} />;
};
