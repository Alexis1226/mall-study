import { gql } from "graphql-tag";

export type Product = {
  id: string;
  imageUrl: string;
  price: string;
  title: string;
  description: string;
  createdAt: string;
};

export type Products = {
  products: Product[];
};

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: string) {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`;
