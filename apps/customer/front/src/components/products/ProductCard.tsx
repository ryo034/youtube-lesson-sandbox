import type { Product } from "@/infrastructure/types"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/ui/card"
import { formatPrice } from "@/infrastructure/lib/utils"
import { AddToCartButton } from "@workspace/ui/components/products/AddToCartButton"
import { Link } from "react-router-dom"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="font-bold text-lg text-primary">{formatPrice(product.price)}</div>
        <AddToCartButton product={product} variant="secondary" />
      </CardFooter>
    </Card>
  )
}
