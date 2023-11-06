import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from './src/dbController';

const db = Array.from({ length: 40 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://picsum.photos/200/150?random=${i}`,
  price: 1000 + Math.floor(Math.random() * 20) * 500,
  title: `임시상품${i}`,
  description: `임시 상세 내용 ${i}`,
  createdAt: 1642424841540 + 1000 * 60 * 60 * 5 * i,
}));

writeDB(DBField.PRODUCTS, db);
