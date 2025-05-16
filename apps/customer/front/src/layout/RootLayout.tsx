import { AuthProvider } from "@/components/auth/auth-provider"
import { CartProvider } from "@/components/cart/cart-provider"
import { Header } from "@/components/Header"
import { Outlet } from "react-router-dom"

export function RootLayout() {
  return (
    <main>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto py-6 px-4">
              <Outlet />
            </main>
            <footer className="border-t py-6 text-center text-sm text-muted-foreground">
              <div className="container mx-auto">&copy; {new Date().getFullYear()} シンプルECサイト</div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </main>
  )
}
