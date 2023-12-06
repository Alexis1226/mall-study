import { checkedCartState } from '../../recoils/cart';
import { useRecoilValue } from 'recoil';
import ItemData from '../cart/itemData';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { usePaymentWidget } from '../../utill/usePaymentWidget';
import { ANONYMOUS, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

const WillPay = ({
  submitTitle,
  handleSubmit,
}: {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  const selector = '#payment-widget';
  const clientKey = import.meta.env.VITE_CLIENT_KEY;
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce((res, { product: { price, createdAt }, amount }) => {
    if (createdAt) res += Number(price) * amount;
    return res;
  }, 0);

  const { data: paymentWidget } = usePaymentWidget(clientKey, ANONYMOUS);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);
  const [price, setPrice] = useState(50_000);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  결제위젯 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: 'DEFAULT' }
    );

    // ------  이용약관 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }
    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <div className="cart-willpay">
      <ul>
        {checkedItems.map(({ product: { imageUrl, price, title, createdAt }, amount, id }) => (
          <li key={id}>
            <ItemData imageUrl={imageUrl} price={price} title={title} key={id} />
            <p>수량 : {amount}</p>
            <p>금액 : {Number(price) * amount}</p>
            {!createdAt && '품절된 상품입니다'}
          </li>
        ))}
      </ul>
      <div id="payment-widget" />
      <div id="agreement" />
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default WillPay;
