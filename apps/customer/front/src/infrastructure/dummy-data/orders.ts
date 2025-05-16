import type { Order } from "@/infrastructure/types"
import { products } from "@/infrastructure/dummy-data/products"
import { v4 as uuidv4 } from "uuid"

// ダミーの注文データを作成
export const orders: Order[] = [
  {
    id: uuidv4(),
    userId: "テストユーザーID", // ログイン時に置き換えられる
    items: [
      { ...products[0], quantity: 1 },
      { ...products[3], quantity: 2 },
    ],
    totalAmount: products[0].price + products[3].price * 2,
    status: "delivered",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30日前
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    userId: "テストユーザーID", // ログイン時に置き換えられる
    items: [
      { ...products[1], quantity: 1 },
      { ...products[5], quantity: 1 },
      { ...products[8], quantity: 1 },
    ],
    totalAmount: products[1].price + products[5].price + products[8].price,
    status: "shipped",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15日前
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    userId: "テストユーザーID", // ログイン時に置き換えられる
    items: [{ ...products[2], quantity: 1 }],
    totalAmount: products[2].price,
    status: "paid",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5日前
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: uuidv4(),
    userId: "テストユーザーID", // ログイン時に置き換えられる
    items: [
      { ...products[4], quantity: 1 },
      { ...products[7], quantity: 1 },
    ],
    totalAmount: products[4].price + products[7].price,
    status: "ordered",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1日前
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
