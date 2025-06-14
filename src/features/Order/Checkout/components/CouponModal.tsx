import { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Modal, type ModalProps } from '@sebin0580/modal';

import { Button } from '@/shared/components/Button';
import { CheckBox } from '@/shared/components/CheckBox';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

import { CouponItem } from '../type/coupon.type';
import { formatDate } from '../utils/formatDate';
import { parseHour } from '../utils/parseHour';

type CouponModalProps = {
  defaultCheckedCouponIds: Set<number>;
  couponItems: CouponItem[];
  onApplyCoupons: (ids: Set<number>) => void;
  title: string;
} & ModalProps;

export const CouponModal = ({
  defaultCheckedCouponIds,
  couponItems,
  onApplyCoupons,
  isOpen,
  onClose,
  title,
}: CouponModalProps) => {
  const [checkedCouponIds, setCheckedCouponIds] = useState<Set<number>>(defaultCheckedCouponIds);

  const handleCheckedCoupon = (id: number) => {
    if (!checkedCouponIds.has(id) && checkedCouponIds.size === 2) return;

    setCheckedCouponIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const modalItems = couponItems.map((couponItem) => ({
    ...couponItem,
    isChecked: checkedCouponIds.has(couponItem.id),
    isDisabled:
      couponItem.isDisabled || (checkedCouponIds.size >= 2 && !checkedCouponIds.has(couponItem.id)),
  }));

  const allChecked = modalItems.filter((item) => item.isChecked).length === 2;

  const handleApplyCoupons = () => {
    onApplyCoupons(checkedCouponIds);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <Flex
        width="100%"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="10px"
        padding="10px 0"
      >
        <Text type="Caption">🥸 쿠폰은 최대 2개까지 사용할 수 있습니다.</Text>
      </Flex>
      <StyledSpacing />
      {modalItems?.map((item) => {
        const isGrayedOut = (allChecked && !item.isChecked) || item.isDisabled;
        return (
          <Fragment key={item.id}>
            <Flex
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap="3px"
              width="100%"
              padding="10px 0 20px 0"
            >
              <Flex
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                gap="10px"
                padding="5px 0"
              >
                <CheckBox
                  checked={item.isChecked}
                  onClick={() => !item.isDisabled && handleCheckedCoupon(item.id)}
                />
                <Text type="Title" color={isGrayedOut ? 'gray' : 'black'}>
                  {item.description}
                </Text>
              </Flex>
              <Text type="Caption" color={isGrayedOut ? 'gray' : 'black'}>
                만료일: {formatDate(item.expirationDate)}
              </Text>
              {item.minimumAmount && (
                <Text type="Caption" color={isGrayedOut ? 'gray' : 'black'}>
                  최소 주문 금액: {item.minimumAmount.toLocaleString()}원
                </Text>
              )}
              {item.availableTime && (
                <Text type="Caption" color={isGrayedOut ? 'gray' : 'black'}>
                  사용 가능 시간: 오전 {parseHour(item.availableTime.start)}시부터{' '}
                  {parseHour(item.availableTime.end)}시까지
                </Text>
              )}
            </Flex>
            <StyledSpacing />
          </Fragment>
        );
      })}
      <Button size="lg" width="100%" onClick={handleApplyCoupons}>
        {`총 ${checkedCouponIds.size}개 쿠폰 사용하기`}
      </Button>
    </Modal>
  );
};

const StyledSpacing = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgb(218, 218, 218);
  border: none;
  margin: 0;
`;
