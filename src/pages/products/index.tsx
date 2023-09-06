import { useQuery } from "@tanstack/react-query";
import {
  grqphQlFetcher,
  QueryKeys,
} from "../../queryClient";
import ProductItem from "../../components/product/item";
import {
  GET_PRODUCTS,
  Products,
} from "../../graphql/products";

const ProductList = () => {
  const { data } = useQuery<Products>(
    [QueryKeys.PRODUCTS],
    () => grqphQlFetcher<Products>(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품 목록</h2>
      <ul className="products">
        {data?.products?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
