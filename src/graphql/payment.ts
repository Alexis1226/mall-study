import gql from "graphql-tag";

export const EXECUTE_PAY = gql`
  type PayInfo {
    id: String!
    amount: Int!
  }
  type PaymentInfos {
    PayInfo: PayInfo[]
  }
  mutation ADD_CART($info: PaymentInfos) {
    payInfo(info : $info)
  }
`;
