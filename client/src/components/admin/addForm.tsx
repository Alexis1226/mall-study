import { useMutation } from '@tanstack/react-query';
import { SyntheticEvent } from 'react';
import { QueryKeys, getClient, graphQlFetcher } from '../../queryClient';
import { ADD_PRODUCT, Product } from '../../graphql/products';
import arrToObj from '../../utill/arrToObj';

type OmittedProduct = Omit<Product, 'id' | 'createdAt'>;

const AddForm = () => {
  const queryClient = getClient();
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: OmittedProduct) =>
      graphQlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: ({ addProduct }) => {
        // 데이터를 stale처리해서 재요청 -> 최신의 데이터로 캐싱
        queryClient.invalidateQueries([QueryKeys.PRODUCTS], {
          exact: false,
          refetchType: 'all',
        });
      },
    }

    // {
    //   onMutate: async ({ id, amount }) => {
    //     await queryClient.cancelQueries([QueryKeys.CART]);
    //     const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>([
    //       QueryKeys.CART,
    //     ]) || { cart: [] };
    //     if (!prevCart) return null;

    //     const targetIndex = prevCart.findIndex((CartItem) => CartItem.id === id);
    //     if (targetIndex === undefined || targetIndex < -1) return prevCart;

    //     const newCart = [...prevCart];
    //     newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount });
    //     queryClient.setQueryData([QueryKeys.CART], { cart: newCart });
    //     return prevCart;
    //   },
    //   onSuccess: ({ updateCart }) => {
    //     const { cart: prevCart } = queryClient.getQueryData<{ cart: CartType[] }>([
    //       QueryKeys.CART,
    //     ]) || { cart: [] };
    //     const targetIndex = prevCart?.findIndex((CartItem) => CartItem.id === updateCart.id);
    //     if (!prevCart || targetIndex === undefined || targetIndex < 0) return;

    //     const newCart = [...prevCart];
    //     newCart.splice(targetIndex, 1, updateCart);
    //     queryClient.setQueryData([QueryKeys.CART], { cart: newCart });
    //   },
    // }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    addProduct(formData as OmittedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        상품명 : <input name="title" type="text" />
      </label>
      <label htmlFor="imageUrl">
        이미지URL:
        <input name="imageUrl" type="text" />
      </label>
      <label htmlFor="price">
        상품가격:
        <input name="price" type="text" required min="1000" />
      </label>
      <label htmlFor="description">
        상세 :
        <textarea name="description" />
      </label>
      <button type="submit">등록</button>
    </form>
  );
};

export default AddForm;
