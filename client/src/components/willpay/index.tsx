import { checkedCartState } from '../../recoils/cart';
import { useRecoilValue } from 'recoil';
import ItemData from '../cart/itemData';
import { SyntheticEvent, useEffect, useState } from 'react';
import PayMethod from './payMethod';
import { useLocation } from 'react-router';

const WillPay = ({
  submitTitle,
  handleSubmit,
}: {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  const { pathname } = useLocation();
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce((res, { product: { price, createdAt }, amount }) => {
    if (createdAt) res += Number(price) * amount;
    return res;
  }, 0);

  const [price, setPrice] = useState(totalPrice);

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice]);

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
      {pathname === '/payment' && <PayMethod price={price} />}
      <div className="cart-willpay__confirm">
        <p>총 결제액: {totalPrice.toLocaleString()}</p>
        <button onClick={handleSubmit}>{submitTitle}</button>
      </div>
    </div>
  );
};

export default WillPay;
