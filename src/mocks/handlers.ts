/* eslint-disable @typescript-eslint/no-unused-vars */
import { graphql } from "msw";
import { v4 as uuid } from "uuid";
import {
  GET_PRODUCT,
  GET_PRODUCTS,
} from "../graphql/products";

const mockProducts = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: uuid(),
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

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(ctx.data({ products: mockProducts }));
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    return res(ctx.data(mockProducts[0]));
  }),
];
