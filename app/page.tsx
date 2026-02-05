import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletters";
import { ProductsGrid } from "@/components/products-grid";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductsGrid />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
