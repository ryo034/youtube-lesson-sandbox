export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: "ordered" | "paid" | "shipped" | "delivered"
  createdAt: string
  updatedAt: string
}
