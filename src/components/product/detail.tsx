const ProductDetail = ({
  item: {
    category,
    image,
    description,
    price,
    title,
    rating: { rate },
  },
}: {
  item: Product;
}) => {
  return (
    <div className="product-detail">
      <p className="product-detail__category">{category}</p>
      <p className="product-detail__title">{title}</p>
      <img className="product-detail__image" src={image} />
      <p className="product-detail__description">
        {description}
      </p>
      <span className="product-detail__price">
        ${price}
      </span>
      <span className="product-detail__rating">{rate}</span>
    </div>
  );
};

export default ProductDetail;
