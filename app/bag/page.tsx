"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light text-foreground mb-12">
            Mon Panier
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-6">
                Votre panier est vide
              </p>
              <Link
                href="/products"
                className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded font-light hover:bg-accent/90 transition-colors"
              >
                Continuer vos achats
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg p-6 flex items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-foreground mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.price.toLocaleString("fr-FR")} {item.currency}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-secondary/30 rounded px-3 py-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-foreground hover:text-accent transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm font-light">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-foreground hover:text-accent transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}
                      <div className="w-24 text-right">
                        <p className="font-light text-accent">
                          {(item.price * item.quantity).toLocaleString("fr-FR")}{" "}
                          {item.currency}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-card rounded-lg p-8 h-fit sticky top-8">
                <h2 className="text-xl font-light text-foreground mb-6">
                  Résumé
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {"Nombre d'articles"}
                    </span>
                    <span className="font-light text-foreground">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-light text-foreground">
                      {totalPrice.toLocaleString("fr-FR")} MGA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frais de port</span>
                    <span className="font-light text-foreground">Gratuit</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="font-light text-foreground">Total</span>
                  <span className="text-2xl font-light text-accent">
                    {totalPrice.toLocaleString("fr-FR")} MGA
                  </span>
                </div>

                <button className="w-full bg-accent text-accent-foreground py-3 rounded font-light hover:bg-accent/90 transition-colors mb-3">
                  Procéder au paiement
                </button>

                <Link
                  href="/products"
                  className="block w-full text-center py-3 text-accent border border-accent rounded font-light hover:bg-accent/5 transition-colors"
                >
                  Continuer vos achats
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
