import { Resolver } from "./types";

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

const productResolver: Resolver = {
  Query: {
    products: (parent, args, context, info) => {
      return mockProducts;
    },
    product: (parent, { id }, context, info) => {
      const found = mockProducts.find(
        (item) => item.id === id
      );
      if (found) return found;
      return null;
    },
  },
};

export default productResolver;
