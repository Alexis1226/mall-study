import { Resolver } from './types';
import { db } from '../../firebase';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

const PAGE_SIZE = 15;

const productResolver: Resolver = {
  Query: {
    products: async (parent, { cursor = '', showDeleted = false }) => {
      const products = collection(db, 'products');
      const queryOptions = [];
      queryOptions.unshift(orderBy('createdAt', 'desc'));
      if (cursor) queryOptions.push(startAfter(cursor));
      if (!showDeleted) queryOptions.unshift(where('createdAt', '!=', null));
      const q = query(products, ...queryOptions, limit(PAGE_SIZE));
      const snapshot = await getDocs(q);
      const data: DocumentData[] = [];
      snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      return data;
    },

    product: async (parent, { id }) => {
      const snapshot = await getDoc(doc(db, 'products', id));
      return { ...snapshot.data(), id: snapshot.id };
    },
  },
  Mutation: {
    addProduct: async (parent, { imageUrl, price, title, description }) => {
      const newProduct = {
        imageUrl,
        price,
        title,
        description,
        createdAt: serverTimestamp(),
      };
      const result = await addDoc(collection(db, 'products'), newProduct);
      const snapshot = await getDoc(result);
      return { ...snapshot.data(), id: snapshot.id };
    },
    updateProduct: async (parent, { id, ...data }) => {
      const existProduct = doc(db, 'products', id);
      if (!existProduct) throw new Error('없는 데이터입니다');
      await updateDoc(existProduct, data);
      const snapshot = await getDoc(existProduct);
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
    deleteProduct: async (parent, { id }) => {
      // 실제 db에서 delete를 하는 대신 creatdAt을 지워준다.
      const existProduct = doc(db, 'products', id);
      if (!existProduct) throw new Error('없는 데이터입니다');
      await updateDoc(existProduct, { createdAt: null });
      return id;
    },
  },
};

export default productResolver;
