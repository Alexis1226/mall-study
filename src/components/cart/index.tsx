import { CartType } from "../../graphql/cart";
import CartItem from "./item";

const CartList = ({ items }: { items: CartType[] }) => {
  return (
    <>
      <label htmlFor="">
        <input
          className="cart-item__checkbox"
          type="checkbox"
        />
        전체선택
      </label>
      <ul className="cart">
        {items.map((item, index) => (
          <CartItem {...item} key={index} />
        ))}
      </ul>
    </>
  );
};

export default CartList;
