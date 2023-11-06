import { useEffect, useRef } from 'react';
import ProductList from '../product/list';
import AddForm from './addForm';
import useIntersection from '../../hooks/useIntersection';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Products } from '../../graphql/products';
import { QueryKeys, graphQlFetcher } from '../../queryClient';
import AdminItem from './item';

const Admin = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      [QueryKeys.PRODUCTS, 'admin'],
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
      <AddForm />
      <ProductList list={data?.pages || []} Item={AdminItem} />
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default Admin;
