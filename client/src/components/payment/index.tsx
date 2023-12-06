import { useRecoilState } from 'recoil';
import WillPay from '../willpay';
import { checkedCartState } from '../../recoils/cart';
import PaymentModal from './modal';
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
  const [modalShown, toggleModal] = useState(false);

  const { mutate: excutePay } = useMutation((ids: PaymentInfos) =>
    graphQlFetcher(EXECUTE_PAY, { ids })
  );

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = async () => {
    const ids = checkedCartData.map(({ id }) => id);

    // excutePay(ids, {
    //   onSuccess: () => {
    //     setCheckedCartData([]);
    //     alert('결제가 완료되었습니다.');
    //     navigate('/products', { replace: true });
    //   },
    // });
  };

  const cancel = () => {
    toggleModal(false);
  };

  const { data: paymentWidget } = usePaymentWidget(clientKey, ANONYMOUS);

  const showPayment = async () => {
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'hippo041@naver.com',
        // successUrl: `${window.location.origin}/success`,
        // failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  return (
    <div>
      <div className="title">결제 방법</div>
      <div id="payment-method"></div>
      <div id="agreement"></div>
      <WillPay submitTitle="결제하기" handleSubmit={showPayment} />
      {/* <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} /> */}
    </div>
  );
};

export default Payment;
