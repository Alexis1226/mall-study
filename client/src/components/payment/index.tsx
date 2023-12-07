import { useRecoilState } from 'recoil';
import WillPay from '../willpay';
import { checkedCartState } from '../../recoils/cart';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { EXECUTE_PAY } from '../../graphql/payment';
import { graphQlFetcher } from '../../queryClient';
import { nanoid } from 'nanoid';
import { usePaymentWidget } from '../../utill/usePaymentWidget';
import { ANONYMOUS } from '@tosspayments/payment-widget-sdk';

type PaymentInfos = string[];

const Payment = () => {
  const navigate = useNavigate();
  const clientKey = import.meta.env.VITE_CLIENT_KEY;
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  const { mutate: excutePay } = useMutation((ids: PaymentInfos) =>
    graphQlFetcher(EXECUTE_PAY, { ids })
  );

  const { data: paymentWidget } = usePaymentWidget(clientKey, ANONYMOUS);

  const pay = async () => {
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '샘플11',
        customerName: '비회원',
        customerEmail: 'customer@test.com',
      });

      const ids = checkedCartData.map(({ id }) => id);

      excutePay(ids, {
        onSuccess: () => {
          setCheckedCartData([]);
          alert('결제가 완료되었습니다.');
          navigate('/cart', { replace: true });
        },
      });
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  return (
    <div>
      <WillPay submitTitle="결제하기" handleSubmit={pay} />
    </div>
  );
};

export default Payment;
