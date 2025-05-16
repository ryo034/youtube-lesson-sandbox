"use server"

import { v4 as uuidv4 } from "uuid"
import type { CartItem, Order } from "@/infrastructure/types"
import { orders } from "@/infrastructure/dummy-data/orders"

// 注文を作成する
export async function createOrder({
  userId,
  items,
  totalAmount,
}: {
  userId: string
  items: CartItem[]
  totalAmount: number
}): Promise<string> {
  // 実際のアプリケーションではデータベースに保存する
  const orderId = uuidv4()

  const newOrder: Order = {
    id: orderId,
    userId,
    items,
    totalAmount,
    status: "ordered",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // モックデータに追加
  orders.unshift(newOrder)

  // 実際のアプリケーションでは非同期処理を行う
  await new Promise((resolve) => setTimeout(resolve, 500))

  return orderId
}

// ユーザーの注文履歴を取得する
export async function getUserOrders(userId: string): Promise<Order[]> {
  // 実際のアプリケーションではデータベースから取得する
  const userOrders = orders.filter((order) => order.userId === userId)

  // 実際のアプリケーションでは非同期処理を行う
  await new Promise((resolve) => setTimeout(resolve, 300))

  return userOrders
}

// 注文詳細を取得する
export async function getOrderById(orderId: string): Promise<Order | null> {
  // 実際のアプリケーションではデータベースから取得する
  const order = orders.find((order) => order.id === orderId)

  // 実際のアプリケーションでは非同期処理を行う
  await new Promise((resolve) => setTimeout(resolve, 300))

  return order || null
}
