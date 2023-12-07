import { ANONYMOUS, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { usePaymentWidget } from '../../utill/usePaymentWidget';
import { useEffect, useRef } from 'react';

const PayMethod = ({ price }: { price: number }) => {
  const selector = '#payment-widget';
  const clientKey = import.meta.env.VITE_CLIENT_KEY;
  const { data: paymentWidget } = usePaymentWidget(clientKey, ANONYMOUS);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

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
    <>
      <div id="payment-widget" />
      <div id="agreement" />
    </>
  );
};

export default PayMethod;
