import { useQuery } from '@tanstack/react-query';
import { QueryKeys, graphQlFetcher } from '../../queryClient';
import { GET_PRODUCTS, Products } from '../../graphql/products';
import ProductList from '../../components/product/list';

const ProductListPage = () => {
  const { data } = useQuery<Products>([QueryKeys.PRODUCTS], () =>
    graphQlFetcher<Products>(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품 목록</h2>
      <ProductList list={data?.products || []} />
    </div>
  );
};

export default ProductListPage;
