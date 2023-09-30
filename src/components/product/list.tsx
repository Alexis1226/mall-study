import { Product } from "../../graphql/products";
import ProductItem from "./item";

const ProductList = ({ list }: { list: Product[] }) => {
  return (
    <ul className="products">
      {list.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))}
    </ul>
  );
};

export default ProductList;
