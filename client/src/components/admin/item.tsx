import { Link } from 'react-router-dom';
import { Product, UPDATE_PRODUCT, MutableProduct, DELETE_PRODUCT } from '../../graphql/products';
import { QueryKeys, getClient, graphQlFetcher } from '../../queryClient';
import { useMutation } from '@tanstack/react-query';
import arrToObj from '../../utill/arrToObj';
import { SyntheticEvent } from 'react';

const AdminItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
  isEditing,
  startEdit,
  doneEdit,
}: Product & { isEditing: boolean; startEdit: () => void; doneEdit: () => void }) => {
  const queryClient = getClient();
  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphQlFetcher(UPDATE_PRODUCT, { id, title, imageUrl, price, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.PRODUCTS], {
          exact: false,
          refetchType: 'all',
        });
        doneEdit();
      },
    }
  );

  const { mutate: deleteProduct } = useMutation(
    ({ id }: { id: string }) => graphQlFetcher(DELETE_PRODUCT, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.PRODUCTS], {
          exact: false,
          refetchType: 'all',
        });
      },
    }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    updateProduct(formData as MutableProduct);
  };

  const deleteItem = () => {
    deleteProduct({ id });
  };

  if (isEditing)
    return (
      <li className="product-item">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            상품명 : <input name="title" type="text" defaultValue={title} />
          </label>
          <label htmlFor="imageUrl">
            이미지URL:
            <input name="imageUrl" type="text" defaultValue={imageUrl} />
          </label>
          <label htmlFor="price">
            상품가격:
            <input name="price" type="text" required min="1000" defaultValue={price} />
          </label>
          <label htmlFor="description">
            상세 :
            <textarea name="description" defaultValue={description} />
          </label>
          <button type="submit">저장</button>
        </form>
      </li>
    );

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        {!createdAt && <span className="product-item__delete-msg">*삭제된 상품*</span>}
        <img className="product-item__image" src={imageUrl} />
        <div>
          <span className="product-item__price">₩{price}</span>
          <button className="product-item__add-cart" onClick={startEdit}>
            수정
          </button>
          <button className="product-item__delete-cart" onClick={deleteItem}>
            삭제
          </button>
        </div>
      </Link>
    </li>
  );
};

export default AdminItem;
