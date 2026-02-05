"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  // Effet pour détecter le scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-lg"
          : "bg-linear-to-b from-background via-background/95 to-transparent border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo avec effet premium */}
          <Link href="/" className="shrink-0 group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative flex items-center justify-center w-10 h-10 bg-linear-to-br from-primary to-primary/80 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                  OPTIC<span className="text-primary">APP</span>
                </div>
                <p className="text-xs font-light text-muted-foreground tracking-wider">
                  LUNETTERIE D'EXCELLENCE
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation avec hover effects */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="relative px-5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all group"
            >
              ACCUEIL
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-cyan-400 transition-all group-hover:w-3/4"></span>
            </Link>
            <Link
              href="/products"
              className="relative px-5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all group"
            >
              COLLECTIONS
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-cyan-400 transition-all group-hover:w-3/4"></span>
            </Link>
            <Link
              href="/brands"
              className="relative px-5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all group"
            >
              MARQUES
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-cyan-400 transition-all group-hover:w-3/4"></span>
            </Link>
            <Link
              href="/services"
              className="relative px-5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all group"
            >
              SERVICES
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-cyan-400 transition-all group-hover:w-3/4"></span>
            </Link>
            <Link
              href="/contact"
              className="relative px-5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all group"
            >
              CONTACT
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-primary to-cyan-400 transition-all group-hover:w-3/4"></span>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Search bar - Desktop */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des lunettes..."
                className="pl-9 pr-4 h-9 w-48 bg-muted/50 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* User account */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex relative text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <User size={20} />
            </Button>

            {/* Cart with badge */}
            <Link
              href="/bag"
              className="relative flex items-center gap-2 group"
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-linear-to-br from-primary to-cyan-500 text-primary-foreground text-xs font-bold rounded-full border-2 border-background">
                    {totalItems}
                  </span>
                )}
              </Button>
              <div className="hidden lg:block">
                <span className="text-xs font-medium text-foreground/70 group-hover:text-primary transition-colors">
                  PANIER
                </span>
                <div className="text-xs text-muted-foreground">
                  {totalItems} article{totalItems !== 1 ? "s" : ""}
                </div>
              </div>
            </Link>

            {/* Mobile menu button */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation avec animation */}
        {isOpen && (
          <div className="lg:hidden animate-in slide-in-from-top duration-300">
            <div className="py-6 border-t border-border/50">
              {/* Search bar - Mobile */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-9 pr-4 h-10 bg-muted/50 border-primary/20"
                />
              </div>

              {/* Mobile menu items */}
              <nav className="space-y-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-1 h-6 bg-linear-to-b from-primary to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>ACCUEIL</span>
                </Link>
                <Link
                  href="/products"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-1 h-6 bg-linear-to-b from-primary to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>COLLECTIONS</span>
                </Link>
                <Link
                  href="/brands"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-1 h-6 bg-linear-to-b from-primary to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>MARQUES</span>
                </Link>
                <Link
                  href="/services"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-1 h-6 bg-linear-to-b from-primary to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>SERVICES</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-1 h-6 bg-linear-to-b from-primary to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span>CONTACT</span>
                </Link>
              </nav>

              {/* User actions mobile */}
              <div className="mt-8 pt-6 border-t border-border/50 space-y-3">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  <span>Mon compte</span>
                </Link>
                <Link
                  href="/bag"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={18} />
                    <span>Mon panier</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="px-2 py-1 bg-linear-to-br from-primary to-cyan-500 text-primary-foreground text-xs font-bold rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
