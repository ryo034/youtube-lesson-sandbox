"use client"

import type { CartItem as CartItemType } from "@/infrastructure/types"
import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@workspace/ui/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { formatPrice } from "@/infrastructure/lib/utils"
import { Link } from "react-router-dom"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <Link to={`/products/${item.id}`} className="hover:underline">
            <h3>{item.name}</h3>
          </Link>
          <p className="ml-4 text-primary">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.price)} / 個</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">数量を減らす</span>
            </Button>

            <span className="w-8 text-center">{item.quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">数量を増やす</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            削除
          </Button>
        </div>
      </div>
    </div>
  )
}
