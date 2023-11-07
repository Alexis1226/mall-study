import { checkedCartState } from '../../recoils/cart';
import { useRecoilValue } from 'recoil';
import ItemData from '../cart/itemData';

import { SyntheticEvent } from 'react';

const WillPay = ({
  submitTitle,
  handleSubmit,
}: {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce((res, { product: { price, createdAt }, amount }) => {
    if (createdAt) res += Number(price) * amount;
    return res;
  }, 0);

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
      <p>총예상결제액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default WillPay;
