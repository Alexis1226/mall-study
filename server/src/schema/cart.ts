import { gql } from "apollo-server-express";

const cartSchema = gql`
  type CartItem {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    amount: Int!
  }

  extends type Query {
    cart: [CartItem!]
  }

  extends type Mutation {
    addCart(id: ID!): CartItem!
    updateCart(id: ID!, amount: Int!): CartItem!
    deleteCart(id: ID!): ID!
    excutePay(ids: [ID!]): [ID!]
  }
`;

export default cartSchema;
