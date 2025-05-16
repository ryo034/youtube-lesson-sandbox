"use client"

import { Button } from "@workspace/ui/components/ui/button"
import { ShoppingCart, User } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { LoginDialog } from "~/components/auth/LoginDialog"
import { useState } from "react"
import { useCart } from "@/components/cart/cart-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/ui/dropdown-menu"
import { Badge } from "@workspace/ui/components/ui/badge"
import { Link } from "react-router-dom"

export function Header() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          シンプルECサイト
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary`}
          >
            ホーム
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/orders">注文履歴</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>ログアウト</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setLoginDialogOpen(true)}>
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </header>
  )
}
