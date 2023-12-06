import { Product } from '../../graphql/products';

const ItemData = ({ imageUrl, price, title }: Pick<Product, 'imageUrl' | 'price' | 'title'>) => {
  return (
    <>
      <img className="cart-item__image" src={imageUrl} />
      <div className="cart-item__title-price">
        <p className="cart-item__title">{title}</p>
        <p className="cart-item__price">{price}</p>
      </div>
    </>
  );
};

export default ItemData;
