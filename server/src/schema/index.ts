import { gql } from "apollo-server-express";
import productSchema from "./product";
import cartSchema from "./cart";

const linkSchema = gql`
  type Query {
    # 모든 스키마를 연결시키기 위한 무의미 값
    _: Boolean
  }
  type Mutation {
    #  모든 스키마를 연결시키기 위한 무의미 값
    _: Boolean
  }
`;

export default [linkSchema, productSchema, cartSchema];
