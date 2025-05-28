import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

import styled from '@emotion/styled';
import { CartItem } from '../types/Cart.types';

type PriceSummaryProps = {
  cartItems: CartItem[];
};

export const PriceSummary = ({ cartItems }: PriceSummaryProps) => {
  const orderPrice = cartItems
    .filter((item) => item.quantity > 0 && item.isChecked)
    .reduce((acc, cart) => {
      return acc + Number(cart.product.price) * Number(cart.quantity);
    }, 0);

  const deliveryFee = orderPrice >= 100000 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryFee;

  return (
    <Flex
      direction={'column'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      gap={'10px'}
      width="100%"
      padding="20px"
    >
      <Text type={'Caption'} weight="regular">
        🛍️ 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </Text>
      <StyledSpacing />
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">주문 금액</Text>
        <Text type="Heading">{orderPrice.toLocaleString()}원</Text>
      </Flex>
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">배송비</Text>
        <Text type="Heading">{deliveryFee.toLocaleString()}원</Text>
      </Flex>
      <StyledSpacing />
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap="0"
        width="100%"
        padding="0 10px"
      >
        <Text type="Body">총 결제 금액</Text>
        <Text type="Heading">{totalPrice.toLocaleString()}원</Text>
      </Flex>
    </Flex>
  );
};

const StyledSpacing = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgb(218, 218, 218);
  border: none;
  margin: 0;
`;
