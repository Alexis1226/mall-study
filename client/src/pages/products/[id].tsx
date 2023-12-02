import { useQuery } from '@tanstack/react-query';
import { QueryKeys, graphQlFetcher } from '../../queryClient';
import { useParams } from 'react-router';
import ProductDetail from '../../components/product/detail';
import { GET_PRODUCT, Product } from '../../graphql/products';
import { RequestDocument } from 'graphql-request';

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<{ product: Product }>([QueryKeys.PRODUCTS, id], () =>
    graphQlFetcher(GET_PRODUCT as RequestDocument, { id })
  );

  if (!data) return null;

  return (
    <div>
      <ProductDetail item={data.product} />
    </div>
  );
};

export default ProductDetailPage;
