/* eslint-disable @typescript-eslint/no-unused-vars */
import { graphql } from "msw";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
} from "../graphql/products";
import {
  ADD_CART,
  CartType,
  GET_CART,
} from "../graphql/cart";

const mockProducts = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://picsum.photos/200/150?random=${
      i + 1
    }`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(
      1646737890123 + i * 1000 * 60 * 10
    ).toString(),
  })
);

let cartData: { [key: string]: CartType } = (() => ({}))();

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find(
      (item) => item.id === req?.variables.id
    );
    if (found) return res(ctx.data(found));
    return res();
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const id = req.variables.id;
    const newData = { ...cartData };
    if (newData[id]) {
      newData[id] = {
        ...newData[id],
        amount: (newData[id].amount || 0) + 1,
      };
    } else {
      const found = mockProducts.find(
        (item) => item.id === req.variables.id
      );
      if (found) {
        newData[id] = {
          ...found,
          amount: 1,
        };
      }
    }
    cartData = newData;
    return res(ctx.data(newData));
  }),
];
