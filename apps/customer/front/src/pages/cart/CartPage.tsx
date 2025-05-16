"use client"

import { useCart } from "@/components/cart/cart-provider"
import { CartItem } from "@/components/cart/CartItem"
import { Button } from "@workspace/ui/components/ui/button"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/ui/card"
import { Separator } from "@workspace/ui/components/ui/separator"
import { formatPrice } from "@/infrastructure/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"
import { LoginDialog } from "@/components/auth/LoginDialog"
import { useState } from "react"
import { createOrder } from "@/infrastructure/lib/actions"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      setLoginDialogOpen(true)
      return
    }

    setIsSubmitting(true)
    try {
      const orderId = await createOrder({
        userId: user.id,
        items: items,
        totalAmount: totalPrice
      })

      clearCart()
      toast("注文が完了しました", {
        description: "ご注文ありがとうございます。"
      })
      navigate(`/orders/${orderId}`)
    } catch (error) {
      toast("エラーが発生しました", {
        description: "注文処理中にエラーが発生しました。もう一度お試しください。"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <h1 className="text-2xl font-bold">カートは空です</h1>
        <p className="text-muted-foreground">商品を追加してください</p>
        <Button onClick={() => navigate("/")}>商品一覧に戻る</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">ショッピングカート</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">注文サマリー</h3>
                <Separator />
                <div className="flex justify-between">
                  <span>小計</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>配送料</span>
                  <span>無料</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>合計</span>
                  <span className="text-lg text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={isSubmitting}>
                {isSubmitting ? "処理中..." : "注文する"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </div>
  )
}
