const ProductItem = ({
  category,
  description,
  image,
  price,
  rating,
  title,
}: Product) => {
  return (
    <li className="'product-item">
      <p className="'product-item__category">{category}</p>
      <p className="'product-item__title">{title}</p>
      <p className="'product-item__description">
        {description}
      </p>
      <img className="'product-item__image" src={image} />
      <p className="'product-item__price">{price}</p>
      <p className="'product-item__rating">{rating.rate}</p>
    </li>
  );
};

export default ProductItem;
