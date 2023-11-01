import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys, graphQlFetcher } from '../../queryClient';
import { GET_PRODUCTS, Products } from '../../graphql/products';
import ProductList from '../../components/product/list';
import { useEffect, useRef } from 'react';
import useIntersection from '../../hooks/useIntersection';

const AdminPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      [QueryKeys.PRODUCTS, true],
      ({ pageParam = '' }) =>
        graphQlFetcher(GET_PRODUCTS, { cursor: pageParam, showDeleted: true }),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.products.at(-1)?.id;
        },
      }
    );

  useEffect(() => {
    if (!intersecting || !isSuccess || !intersecting || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <div>
      <h2>Admin</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default AdminPage;
