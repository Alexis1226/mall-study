import { useQuery } from '@tanstack/react-query';
import { QueryKeys, graphQlFetcher } from '../../queryClient';

import CartList from '../../components/cart';
import { CartType, GET_CART } from '../../graphql/cart';

const Cart = () => {
  const { data } = useQuery([QueryKeys.CART], () => graphQlFetcher(GET_CART), {
    staleTime: 0,
    cacheTime: 1000,
  });
  const cartItems = (data?.cart || []) as CartType[];

  if (!cartItems.length) return <div> 장바구니가 비었어요</div>;

  return <CartList items={cartItems} />;
};

export default Cart;
