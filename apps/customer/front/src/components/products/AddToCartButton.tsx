"use client"

import { useState } from "react"
import { Button, type ButtonProps } from "@workspace/ui/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import type { Product } from "@/infrastructure/types"
import { useAuth } from "@/components/auth/auth-provider"
import { LoginDialog } from "~/components/auth/LoginDialog"

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  product: Product
}

export function AddToCartButton({ product, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const [added, setAdded] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const handleAddToCart = () => {
    if (!user) {
      setLoginDialogOpen(true)
      return
    }

    addItem(product)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <>
      <Button onClick={handleAddToCart} {...props}>
        {added ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            追加済み
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            カートに追加
          </>
        )}
      </Button>
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  )
}
