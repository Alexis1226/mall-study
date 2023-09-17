import { useMutation } from "@tanstack/react-query";
import { CartType, UPDATE_CART } from "../../graphql/cart";
import { grqphQlFetcher } from "../../queryClient";
import { SyntheticEvent } from "react";

const CartItem = ({
  id,
  imageUrl,
  price,
  title,
  amount,
}: CartType) => {
  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      grqphQlFetcher(UPDATE_CART, { id, amount })
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number(
      (e.target as HTMLInputElement).value
    );
    updateCart({ id, amount });
  };
  return (
    <li>
      <img src={imageUrl} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
      <input
        type="number"
        className="cart_item__amount"
        value={amount}
        onChange={handleUpdateAmount}
      />
    </li>
  );
};

export default CartItem;
