import { CartType } from "../../graphql/cart";
import CartItem from "./item";

const CartList = ({ items }: { items: CartType[] }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <CartItem {...item} key={index} />
      ))}
    </ul>
  );
};

export default CartList;
