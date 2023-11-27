import { useEffect, useRef, useState } from 'react';
import AddForm from './addForm';
import useIntersection from '../../hooks/useIntersection';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GET_PRODUCTS, Products } from '../../graphql/products';
import { QueryKeys, graphQlFetcher } from '../../queryClient';
import AdminList from './list';

const Admin = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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

  const startEdit = (index: number) => () => setEditingIndex(index);
  const doneEdit = (index: number) => setEditingIndex(null);

  useEffect(() => {
    if (!intersecting || !isSuccess || !intersecting || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <div>
      <AdminList
        list={data?.pages || []}
        editingIndex={editingIndex}
        startEdit={startEdit}
        doneEdit={doneEdit}
      />
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default Admin;
