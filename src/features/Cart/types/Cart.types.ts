import { useFetchData } from '@/shared/hooks/useFetchData';

import { Product } from './Product.types';

export type CartResponse = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CartItem[];
  number: number;
  sort: object;
  pageable: object;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type CartItem = {
  id: number;
  quantity: number;
  isChecked: boolean;
  product: Product;
};

export type CartItemList = {
  cartItems: CartItem[];
};

export type CartDataState = {
  cart: ReturnType<typeof useFetchData<CartItem[]>>;
};
