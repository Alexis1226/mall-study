import { DBField, writeDB } from '../dbController';
import { Cart, Resolver } from './types';

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, { db }) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }) => {
      if (!id) throw Error('id가 없습니다');
      const targetProduct = db.products.find((item) => item.id === id);
      if (!targetProduct) throw Error('targetProduct가 없습니다');

      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex > -1) {
        const newCartItem = {
          id,
          amount: db.cart[existCartIndex].amount + 1,
        };
        db.cart.splice(existCartIndex, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }

      const newItem = {
        id,
        amount: 1,
      };
      db.cart.push(newItem);
      setJSON(db.cart);
      return newItem;
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다');
      }
      const newCartItem = {
        id,
        amount,
      };
      db.cart.splice(existCartIndex, 1, newCartItem);
      setJSON(db.cart);
      return newCartItem;
    },
    deleteCart: (parent, { id }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다');
      }
      db.cart.splice(existCartIndex, 1);
      setJSON(db.cart);
      return id;
    },
    excutePay: (parent, { ids }, { db }) => {
      const newCartData = db.cart.filter((cartItem) => !ids.includes(cartItem.id));
      if (
        ids.some((id: string) => {
          const product = db.products.find((product: any) => product.id === id);
          return !product?.createdAt;
        })
      )
        throw new Error('결제할 상품에 삭제된 상품이 있습니다');
      db.cart = newCartData;
      setJSON(db.cart);
      return ids;
    },
  },
  CartItem: {
    // cartItem이 상위항목인 아이템의 product항목은 아래에서 구한 값으로 채워 넣는다
    product: (cartItem, args, { db }) =>
      db.products.find((product: any) => product.id === cartItem.id),
  },
};

export default cartResolver;
