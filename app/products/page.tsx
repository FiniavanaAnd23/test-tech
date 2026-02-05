"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useMemo } from "react";
import productsList from "@/lib/products.json";
import Image from "next/image";
import {
  Filter,
  SortAsc,
  Eye,
  Heart,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  X,
  Check,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string | null;
  brand: string;
  price: number | string;
  currency: string;
  thumbnail: string;
  isAvailable: boolean | string;
  category?: string;
  tags?: string[];
};

export default function ProduitsPage() {
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Clean and validate products data
  const cleanedProducts = useMemo(() => {
    return productsList.data
      .map((p: any) => ({
        ...p,
        name: p.name || `${p.brand} Monture`,
        price:
          typeof p.price === "string"
            ? parseInt(p.price, 10) || 0
            : typeof p.price === "number" && p.price > 0
              ? p.price
              : Math.abs(p.price || 0),
        isAvailable:
          typeof p.isAvailable === "string"
            ? p.isAvailable === "true"
            : p.isAvailable === true,
        thumbnail: p.thumbnail || "/images/placeholder.png",
        category: p.category || "Montures",
        tags: p.tags || [],
      }))
      .filter((p: Product) => p.isAvailable);
  }, []);

  // Get unique brands, categories, and price range
  const brands = useMemo(() => {
    const uniqueBrands = new Set(cleanedProducts.map((p: Product) => p.brand));
    return Array.from(uniqueBrands).sort();
  }, [cleanedProducts]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      cleanedProducts.map((p: Product) => p.category),
    );
    return Array.from(uniqueCategories).sort();
  }, [cleanedProducts]);

  const maxPrice = useMemo(() => {
    return Math.max(...cleanedProducts.map((p: Product) => Number(p.price)));
  }, [cleanedProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = cleanedProducts;

    // Search filter
    if (searchQuery) {
      products = products.filter(
        (p: Product) =>
          (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Brand filter
    if (filterBrand) {
      products = products.filter((p: Product) => p.brand === filterBrand);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      products = products.filter((p: Product) =>
        selectedCategories.includes(p.category || ""),
      );
    }

    // Price range filter
    products = products.filter(
      (p: Product) =>
        Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1],
    );

    // Sorting
    products.sort((a: Product, b: Product) => {
      if (sortBy === "price") {
        const priceA = typeof a.price === "number" ? a.price : 0;
        const priceB = typeof b.price === "number" ? b.price : 0;
        return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
      } else {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB, "fr")
          : nameB.localeCompare(nameA, "fr");
      }
    });

    return products;
  }, [
    cleanedProducts,
    sortBy,
    sortDirection,
    filterBrand,
    searchQuery,
    selectedCategories,
    priceRange,
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-cyan-500/5 rounded-full blur-3xl -z-10" />

      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header with gradient */}
          <div className="mb-12 text-center animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Collection Exclusive
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Nos Collections
              </span>
              <span className="block bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Découvrez notre sélection exclusive de lunettes conçues pour
              exprimer votre style unique
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-12 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Rechercher une monture, une marque..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Sort and Filter Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  {selectedCategories.length > 0 && (
                    <span className="ml-1 px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    if (sortBy === "price") {
                      setSortDirection(
                        sortDirection === "asc" ? "desc" : "asc",
                      );
                    } else {
                      setSortBy("price");
                      setSortDirection("asc");
                    }
                  }}
                  className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  <SortAsc className="w-4 h-4" />
                  {sortBy === "price"
                    ? `Prix ${sortDirection === "asc" ? "Croissant" : "Décroissant"}`
                    : "Trier"}
                </Button>
              </div>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="mt-6 pt-6 border-t border-border/50 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Catégories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                            selectedCategories.includes(category)
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "hover:bg-muted"
                          }`}
                        >
                          {selectedCategories.includes(category) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 border rounded border-border" />
                          )}
                          <span className="text-sm">{category}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Marques
                    </h3>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="w-full px-4 py-2 bg-background/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      <option value="">Toutes les marques</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Fourchette de prix
                    </h3>
                    <div className="space-y-4">
                      <div className="px-4 py-2 bg-background/50 border border-primary/20 rounded-lg">
                        <span className="text-sm text-primary font-medium">
                          {priceRange[0]} - {priceRange[1]}{" "}
                          {cleanedProducts[0]?.currency || "€"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>{maxPrice / 2}</span>
                        <span>{maxPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border/50">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedCategories([]);
                      setFilterBrand("");
                      setPriceRange([0, maxPrice]);
                    }}
                  >
                    Réinitialiser
                  </Button>
                  <Button onClick={() => setIsFilterOpen(false)}>
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            )}

            {/* Active filters */}
            {(selectedCategories.length > 0 ||
              filterBrand ||
              searchQuery ||
              priceRange[1] < maxPrice) && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {category}
                      <button
                        onClick={() => toggleCategory(category)}
                        className="hover:text-primary/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {filterBrand && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                      Marque: {filterBrand}
                      <button
                        onClick={() => setFilterBrand("")}
                        className="hover:text-primary/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {searchQuery && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                      Recherche: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="hover:text-primary/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {priceRange[1] < maxPrice && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                      Prix: ≤ {priceRange[1]}
                      <button
                        onClick={() => setPriceRange([0, maxPrice])}
                        className="hover:text-primary/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              {filteredProducts.length} produit
              {filteredProducts.length !== 1 ? "s" : ""} trouvé
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Vue:</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary"
                >
                  Grille
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  Liste
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product: Product, index: number) => (
                <div
                  key={product.id}
                  className="group animate-in fade-in duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-cyan-500/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-500" />

                  <Link href={`/products/${product.id}`}>
                    <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gradient-to-b from-secondary/20 to-background flex items-center justify-center p-8">
                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                          <div className="absolute top-4 left-4 z-10 flex gap-2">
                            {product.tags.includes("new") && (
                              <span className="px-3 py-1 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground text-xs font-bold rounded-full">
                                NOUVEAU
                              </span>
                            )}
                            {product.tags.includes("3d") && (
                              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                3D
                              </span>
                            )}
                          </div>
                        )}

                        {/* Quick actions */}
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
                            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                            onClick={(e) => {
                              e.preventDefault();
                              // Add to wishlist
                            }}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                            onClick={(e) => {
                              e.preventDefault();
                              // Quick view
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Product image */}
                        {product.thumbnail && product.thumbnail !== "" ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={product.thumbnail || "/image-test.png"}
                              alt={product.name || "Monture"}
                              fill
                              className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="text-8xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            👓
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <p className="text-sm text-primary font-medium mb-1">
                            {product.brand}
                          </p>
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                              {(typeof product.price === "number"
                                ? product.price
                                : 0
                              ).toLocaleString("fr-FR")}{" "}
                              {product.currency}
                            </p>
                            <p className="text-xs text-muted-foreground">TTC</p>
                          </div>
                          <Button
                            variant="default"
                            size="sm"
                            className="gap-2 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-primary-foreground"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Voir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-in fade-in duration-500">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Aucun produit trouvé
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Essayez de modifier vos critères de recherche ou explorez notre
                catalogue complet
              </p>
              <Button
                onClick={() => {
                  setSelectedCategories([]);
                  setFilterBrand("");
                  setSearchQuery("");
                  setPriceRange([0, maxPrice]);
                }}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Voir tous les produits
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-16 pt-12 border-t border-border/50">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon">
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
