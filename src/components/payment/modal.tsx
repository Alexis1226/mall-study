import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPotal = ({
  children,
}: {
  children: ReactNode;
}) => {
  return createPortal(
    children,
    document.getElementById("modal")!
  );
};

const PaymentModal = ({
  show,
  proceed,
  cancel,
}: {
  show: boolean;
  proceed: () => void;
  cancel: () => void;
}) => {
  return show ? (
    <ModalPotal>
      <div className={`modal ${show ? "show" : ""} `}>
        <div className="modal__inner">
          <p>정말 결제할까요?</p>
          <div>
            <button onClick={proceed}>예</button>
            <button onClick={cancel}>아니오 </button>
          </div>
        </div>
      </div>
    </ModalPotal>
  ) : null;
};

export default PaymentModal;
