import { useRecoilState } from "recoil";
import WillPay from "../willpay";
import { checkedCartState } from "../../recoils/cart";
import PaymentModal from "./modal";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { EXECUTE_PAY } from "../../graphql/payment";
import { grqphQlFetcher } from "../../queryClient";

type PayInfo = {
  id: string;
  amount: number;
};
type PaymentInfos = PayInfo[];

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const [modalShown, toggleModal] = useState(false);
  const { mutate: excutePay } = useMutation(
    (payInfo: PaymentInfos) =>
      grqphQlFetcher(EXECUTE_PAY, payInfo)
  );

  const showModal = () => {
    toggleModal(true);
  };
  const proceed = () => {
    const payInfos = checkedCartData.map(
      ({ id, amount }) => ({ id, amount })
    );
    excutePay(payInfos);
    setCheckedCartData([]);
    navigate("/products", { replace: true });
  };

  const cancel = () => {
    toggleModal(false);
  };

  return (
    <div>
      <WillPay
        submitTitle="결제하기"
        handleSubmit={showModal}
      />
      <PaymentModal
        show={modalShown}
        proceed={proceed}
        cancel={cancel}
      />
    </div>
  );
};

export default Payment;
