import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Product, Resolver } from './types';
import { db } from '../../firebase';

const cartResolver: Resolver = {
  Query: {
    cart: async (parent, args) => {
      const cart = collection(db, 'cart');
      const cartsnap = await getDocs(cart);
      const data: DocumentData[] = [];
      cartsnap.forEach((doc) => {
        const d = doc.data();
        data.push({ id: doc.id, ...d });
      });
      return data;
    },
  },
  Mutation: {
    addCart: async (parent, { productId }) => {
      if (!productId) throw Error('id가 없습니다');
      const targetProduct = doc(db, 'products', productId);
      const cartCollection = collection(db, 'cart');
      let cartRef;
      const exist = (await getDocs(query(cartCollection, where('product', '==', targetProduct))))
        .docs[0];

      if (exist) {
        cartRef = doc(db, 'cart', exist.id);
        await updateDoc(cartRef, { amount: increment(1) });
      } else {
        cartRef = await addDoc(cartCollection, { amount: 1, product: targetProduct });
      }
      const cartSnapshot = await getDoc(cartRef);
      return {
        ...cartSnapshot.data(),
        product: targetProduct,
        id: cartSnapshot.id,
      };
    },
    updateCart: async (parent, { cartId, amount }) => {
      if (amount < 1) throw Error('1이상 수량을 입력해주세요');
      if (!cartId) throw Error('장바구니 정보가 없습니다');
      const cartRef = doc(db, 'cart', cartId);
      await updateDoc(cartRef, { amount });
      const cartSnapshot = await getDoc(cartRef);
      return {
        ...cartSnapshot.data(),
        id: cartSnapshot.id,
      };
    },
    deleteCart: async (parent, { cartId }) => {
      const existCart = doc(db, 'cart', cartId);
      if (!existCart) throw new Error('없는 데이터입니다');
      await deleteDoc(existCart);
      return cartId;
    },
    excutePay: async (parent, { ids }) => {
      const deleted = [];
      for await (const id of ids) {
        const cartRef = doc(db, 'cart', id); // cartId
        const cartSnapshot = await getDoc(cartRef);
        const cartData = cartSnapshot.data();
        const productRef = cartData?.product;
        if (!productRef) throw Error('상품정보가 없습니다');
        const product = (await getDoc(productRef)).data() as Product;
        if (product?.createdAt) {
          await deleteDoc(cartRef);
          deleted.push(id);
        } else {
        }
      }
      return deleted;
    },
  },
  CartItem: {
    // cartItem이 상위항목인 아이템의 product항목은 아래에서 구한 값으로 채워 넣는다
    product: async (cartItem, args) => {
      const product = await getDoc(cartItem.product);
      const data = product.data() as any;
      return { ...data, id: product.id };
    },
  },
};

export default cartResolver;
