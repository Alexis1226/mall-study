import { Link } from 'react-router-dom';
import { Product } from '../../graphql/products';
import { graphQlFetcher } from '../../queryClient';
import { useMutation } from '@tanstack/react-query';
import { ADD_CART } from '../../graphql/cart';

const ProductItem = ({ id, imageUrl, price, title }: Product) => {
  const { mutate: addCart } = useMutation((id: string) => graphQlFetcher(ADD_CART, { id }));

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <img className="product-item__image" src={imageUrl} />
        <div>
          <span className="product-item__price">₩{price}</span>
          <button className="product-item__add-cart" onClick={() => addCart(id)}>
            담기
          </button>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
