import { gql } from 'graphql-tag';

export type Product = {
  id: string;
  imageUrl: string;
  price: string;
  title: string;
  description: string;
  createdAt: number;
};

export type Products = {
  products: Product[];
};

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($cursor: ID) {
    products(cursor: $cursor) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;
