"use client";

import Link from "next/link";
import productsList from "@/lib/products.json";
import { Button } from "./ui/button";
import { Eye, Sparkles, ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/data/products";
import { Product } from "@/lib/types/product";

export function ProductsGrid() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  console.log(products);

  useEffect(() => {
    getFeaturedProducts(6).then(setProducts);
  }, []);

  return (
    <section className="bg-background py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-primary/5 to-transparent" />
      <div className="absolute -right-32 top-1/4 w-64 h-64 bg-linear-to-br from-primary/10 to-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-linear-to-br from-primary/5 to-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 text-center animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Collection Exclusive
            </span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            Votre style.
            <span className="block text-primary">Notre passion</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Découvrez notre collection exclusive de montures premium, conçues
            avec
            <span className="text-primary font-medium">
              {" "}
              passion et précision{" "}
            </span>
            pour exprimer votre style personnel.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product: any, index: number) => {
            const priceNum =
              typeof product.price === "string"
                ? parseInt(product.price, 10)
                : product.price;
            const has3DView =
              product.id === "frame-001" ||
              product.id === "frame-002" ||
              product.id === "frame-003";

            return (
              <div
                key={product.id}
                className="group relative animate-in fade-in duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-cyan-500/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-500" />

                <Link
                  href={`/products/${product.id}`}
                  className="relative block"
                >
                  {/* Product Card with hover effects */}
                  <div className="relative bg-linear-to-b from-background to-secondary rounded-2xl p-10 mb-8 flex items-center justify-center aspect-square overflow-hidden border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                    {/* Quick action buttons */}
                    <div
                      className={`absolute top-4 right-4 z-10 flex flex-col gap-2 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to wishlist functionality
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Product Image/Emoji */}
                    <div className="relative">
                      <div className="text-8xl opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                        {product.thumbnail && product.thumbnail !== "" ? (
                          <Image
                            width={800}
                            height={100}
                            src={product.thumbnail || "/image-test.png"}
                            alt={product.name || "img1"}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="text-6xl">👓</div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary/0 group-hover:to-primary/10 rounded-full transition-all duration-500" />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="default"
                        className="px-6 py-3 bg-linear-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all transform group-hover:scale-100 scale-90"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name || `${product.brand} Monture`}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.brand || "Designer Collection"}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                        {priceNum?.toLocaleString("fr-FR")} {product.currency}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {parseInt(product.originalPrice, 10)?.toLocaleString(
                            "fr-FR",
                          )}{" "}
                          {product.currency}
                        </span>
                      )}
                    </div>

                    {/* Additional info */}
                    {has3DView && (
                      <div className="pt-4 border-t border-border/50">
                        <div className="inline-flex items-center gap-2 text-xs text-primary font-medium">
                          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                          <span>Essayage virtuel disponible</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View More Button with animation */}
        <div className="flex justify-center mt-20 animate-in fade-in duration-1000">
          <Link href="/products">
            <Button
              variant="outline"
              className="group relative px-8 py-6 border-primary/30 hover:border-primary hover:bg-primary/5 text-foreground hover:text-primary transition-all duration-300 overflow-hidden"
            >
              {/* Animated background */}
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <span className="relative flex items-center gap-3 text-lg font-medium">
                Découvrir toute la collection
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                {productsList.data.length}+
              </div>
              <p className="text-sm text-muted-foreground">Montures uniques</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                30+
              </div>
              <p className="text-sm text-muted-foreground">Marques premium</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                2 ans
              </div>
              <p className="text-sm text-muted-foreground">Garantie</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                98%
              </div>
              <p className="text-sm text-muted-foreground">
                Clients satisfaits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
