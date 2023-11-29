import { useMutation } from '@tanstack/react-query';
import { SyntheticEvent, useState } from 'react';
import { QueryKeys, getClient, graphQlFetcher } from '../../queryClient';
import { ADD_PRODUCT, MutableProduct } from '../../graphql/products';
import arrToObj from '../../utill/arrToObj';

const AddForm = () => {
  const queryClient = getClient();
  const [submitDisable, setSubmitDisable] = useState(false);
  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphQlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: ({ addProduct }) => {
        // 데이터를 stale처리해서 재요청 -> 최신의 데이터로 캐싱
        queryClient.invalidateQueries([QueryKeys.PRODUCTS], {
          exact: false,
          refetchType: 'all',
        });
        setSubmitDisable(false);
      },
    }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    setSubmitDisable(true);
    addProduct(formData as MutableProduct);
    (e?.target as HTMLFormElement).reset();
  };

  return (
    <form className="form__adminAdd" onSubmit={handleSubmit}>
      <label htmlFor="title">
        상품명 :<input name="title" id="title" type="text" required />
      </label>
      <label htmlFor="imageUrl">
        이미지URL :<input name="imageUrl" id="imageUrl" type="text" required />
      </label>
      <label htmlFor="price">
        상품가격 :<input name="price" id="price" type="text" required min="1000" />
      </label>
      <label htmlFor="description">
        상세 :<textarea name="description" id="description" required />
      </label>
      <button type="submit" disabled={submitDisable}>
        등록
      </button>
    </form>
  );
};

export default AddForm;
