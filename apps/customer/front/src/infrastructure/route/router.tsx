import {  RouterProvider, createBrowserRouter } from "react-router-dom"
import { RootLayout } from "~/layout/RootLayout"
import CartPage from "~/pages/cart/CartPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/cart",
        element: <CartPage />
      }
    ]
  }
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
