"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, Product } from "@/infrastructure/types"
import { useToast } from "@workspace/ui/components/ui/use-toast"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // カートの合計金額を計算
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // ローカルストレージからカート情報を取得
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // カート情報をローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // 商品をカートに追加
  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // 既存のアイテムの数量を更新
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )

        toast({
          title: "カートを更新しました",
          description: `${product.name}の数量を${existingItem.quantity + quantity}に更新しました`,
        })

        return updatedItems
      } else {
        // 新しいアイテムを追加
        const newItem: CartItem = {
          ...product,
          quantity,
        }

        toast({
          title: "カートに追加しました",
          description: `${product.name}をカートに追加しました`,
        })

        return [...prevItems, newItem]
      }
    })
  }

  // 商品をカートから削除
  const removeItem = (id: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id)

      if (itemToRemove) {
        toast({
          title: "商品を削除しました",
          description: `${itemToRemove.name}をカートから削除しました`,
        })
      }

      return prevItems.filter((item) => item.id !== id)
    })
  }

  // 商品の数量を更新
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // カートを空にする
  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
