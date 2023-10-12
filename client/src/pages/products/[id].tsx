import { useQuery } from "@tanstack/react-query";
import {
  QueryKeys,
  grqphQlFetcher,
} from "../../queryClient";
import { useParams } from "react-router";
import ProductDetail from "../../components/product/detail";
import {
  GET_PRODUCT,
  Product,
} from "../../graphql/products";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<Product>(
    [QueryKeys.PRODUCTS, id],
    () => grqphQlFetcher<Product>(GET_PRODUCT, { id })
  );

  if (!data) return null;

  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
