"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import productsList from "@/lib/products.json";
import Image from "next/image";
import {
  Filter,
  SortAsc,
  Eye,
  Sparkles,
  ChevronDown,
  X,
  Check,
  Search,
  Grid,
  Star,
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
  description?: string;
  rating?: number;
  reviews?: number;
  deliveryTime?: string;
};

export default function ProduitsPage() {
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);

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
        description:
          p.description ||
          "Monture premium conçue avec soin pour votre confort et style.",
        rating: p.rating || Math.random() * 2 + 3,
        reviews: p.reviews || Math.floor(Math.random() * 100),
        deliveryTime: p.deliveryTime || "2-4 jours",
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

  // CORRECTION ICI : Utiliser le prix maximum réel au lieu de 1000
  const maxPrice = useMemo(() => {
    return Math.max(...cleanedProducts.map((p: Product) => Number(p.price)));
  }, [cleanedProducts]);

  // CORRECTION ICI : Initialiser priceRange avec le vrai maxPrice
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

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

    // Price range filter - CORRECTION : Pas de filtre par défaut
    // (déjà initialisé avec [0, maxPrice] donc tous les produits)
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
      } else if (sortBy === "rating") {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return sortDirection === "asc" ? ratingA - ratingB : ratingB - ratingA;
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

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductsPerPageChange = (value: number) => {
    setProductsPerPage(value);
    setCurrentPage(1);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterBrand,
    searchQuery,
    selectedCategories,
    priceRange,
    sortBy,
    sortDirection,
  ]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Fonction pour réinitialiser tous les filtres
  const resetAllFilters = () => {
    setFilterBrand("");
    setSearchQuery("");
    setSelectedCategories([]);
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
    setCurrentPage(1);
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters =
    searchQuery ||
    filterBrand ||
    selectedCategories.length > 0 ||
    (priceRange[1] < maxPrice && maxPrice > 0);

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-primary/5 to-cyan-500/5 rounded-full blur-3xl -z-10" />

      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header simplified */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Collection Exclusive
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="block bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Tous nos Produits
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              {cleanedProducts.length} montures premium disponibles
            </p>
          </div>

          {/* Search and Filter Bar - Simplified */}
          <div className="mb-12 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Rechercher un produit, une marque..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              {/* Sort and Filter Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="gap-1 border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  <Filter className="w-3 h-3" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      !
                    </span>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
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
                  className="gap-1 border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  <SortAsc className="w-3 h-3" />
                  {sortBy === "price"
                    ? `Prix ${sortDirection === "asc" ? "↑" : "↓"}`
                    : "Trier"}
                </Button>

                {/* Bouton pour réinitialiser tous les filtres */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAllFilters}
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    Tout afficher
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Panel - Simplified */}
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t border-border/30 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Categories */}
                  <div>
                    <h3 className="text-xs font-medium text-foreground mb-2">
                      Catégories
                    </h3>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`flex items-center gap-2 w-full px-2 py-1.5 rounded transition-all text-sm ${
                            selectedCategories.includes(category)
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "hover:bg-muted"
                          }`}
                        >
                          {selectedCategories.includes(category) ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <div className="w-3 h-3 border rounded border-border" />
                          )}
                          <span>{category}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="text-xs font-medium text-foreground mb-2">
                      Marques
                    </h3>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="w-full px-3 py-1.5 bg-background/50 border border-primary/20 rounded focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    >
                      <option value="">Toutes les marques</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range - Avec indication du prix max réel */}
                  <div>
                    <h3 className="text-xs font-medium text-foreground mb-2">
                      Prix maximum
                    </h3>
                    <div className="space-y-2">
                      <div className="px-3 py-1.5 bg-background/50 border border-primary/20 rounded text-sm flex justify-between items-center">
                        <span className="text-primary font-medium">
                          Jusqu'à {priceRange[1].toLocaleString("fr-FR")}{" "}
                          {cleanedProducts[0]?.currency || "€"}
                        </span>
                        {priceRange[1] < maxPrice && (
                          <button
                            onClick={() => setPriceRange([0, maxPrice])}
                            className="text-xs text-muted-foreground hover:text-primary"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={
                          (e) => setPriceRange([0, Number(e.target.value)]) // Toujours partir de 0
                        }
                        className="w-full h-1.5 bg-muted rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>{(maxPrice / 2).toLocaleString("fr-FR")}</span>
                        <span>{maxPrice.toLocaleString("fr-FR")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter actions */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/30">
                  <div className="text-xs text-muted-foreground">
                    {filteredProducts.length} produits correspondent
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={resetAllFilters}>
                      Tout réinitialiser
                    </Button>
                    <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Active filters - Simplifié */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Filtres actifs :
                  </span>
                  {selectedCategories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                    >
                      {category}
                      <button
                        onClick={() => toggleCategory(category)}
                        className="hover:text-primary/70"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {filterBrand && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      Marque: {filterBrand}
                      <button
                        onClick={() => setFilterBrand("")}
                        className="hover:text-primary/70"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                  {searchQuery && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="hover:text-primary/70"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                  {priceRange[1] < maxPrice && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      ≤ {priceRange[1].toLocaleString("fr-FR")}{" "}
                      {cleanedProducts[0]?.currency || "€"}
                      <button
                        onClick={() => setPriceRange([0, maxPrice])}
                        className="hover:text-primary/70"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results count et pagination controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              {totalPages > 1 ? (
                <>
                  Affichage {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, filteredProducts.length)} sur{" "}
                  {filteredProducts.length} produits
                  {filteredProducts.length !== cleanedProducts.length && (
                    <span className="text-primary"> (filtrés)</span>
                  )}
                </>
              ) : (
                <>
                  {filteredProducts.length} produit
                  {filteredProducts.length !== 1 ? "s" : ""}
                  {filteredProducts.length !== cleanedProducts.length && (
                    <span className="text-primary"> (filtrés)</span>
                  )}
                </>
              )}
            </p>

            {filteredProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Par page:</span>
                <select
                  value={productsPerPage}
                  onChange={(e) =>
                    handleProductsPerPageChange(Number(e.target.value))
                  }
                  className="px-2 py-1 bg-background/50 border border-primary/20 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                >
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                </select>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product: Product, index: number) => (
                  <div
                    key={product.id}
                    className="group animate-in fade-in duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="relative bg-card rounded-lg border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-200">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-linear-to-b from-secondary/10 to-background flex items-center justify-center p-6">
                          {/* Tags */}
                          {product.tags && product.tags.includes("new") && (
                            <div className="absolute top-3 left-3 z-10">
                              <span className="px-2 py-1 bg-linear-to-r from-primary to-cyan-500 text-primary-foreground text-xs font-medium rounded">
                                NOUVEAU
                              </span>
                            </div>
                          )}

                          {/* Product image */}
                          {product.thumbnail && product.thumbnail !== "" ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={product.thumbnail || "/image-test.png"}
                                alt={product.name || "Monture"}
                                fill
                                className="object-contain p-4 transition-transform duration-200 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          ) : (
                            <div className="text-6xl opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                              👓
                            </div>
                          )}

                          {/* Overlay au survol */}
                          <div className="absolute inset-0 bg-linear-to-t from-primary/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {product.brand}
                            </p>
                            <h3 className="text-base font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              {renderStars(product.rating || 0)}
                              <span className="text-xs text-muted-foreground">
                                ({product.reviews} avis)
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-border/30">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-lg font-semibold text-primary">
                                  {(typeof product.price === "number"
                                    ? product.price
                                    : 0
                                  ).toLocaleString("fr-FR")}{" "}
                                  {product.currency}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {product.category}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs text-muted-foreground hover:text-primary hover:bg-primary/10"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Voir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-border/30">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-3 h-3 rotate-90" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {/* Toujours afficher la première page */}
                    <Button
                      variant={currentPage === 1 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      className="w-8 h-8 min-w-0"
                    >
                      1
                    </Button>

                    {/* Points de suspension si nécessaire */}
                    {currentPage > 3 && (
                      <span className="px-1 text-muted-foreground">...</span>
                    )}

                    {/* Pages autour de la page courante */}
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNumber = i + 1;
                      if (
                        pageNumber > 1 &&
                        pageNumber < totalPages &&
                        Math.abs(pageNumber - currentPage) <= 1
                      ) {
                        return (
                          <Button
                            key={pageNumber}
                            variant={
                              currentPage === pageNumber ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => handlePageChange(pageNumber)}
                            className="w-8 h-8 min-w-0"
                          >
                            {pageNumber}
                          </Button>
                        );
                      }
                      return null;
                    })}

                    {/* Points de suspension si nécessaire */}
                    {currentPage < totalPages - 2 && totalPages > 5 && (
                      <span className="px-1 text-muted-foreground">...</span>
                    )}

                    {/* Dernière page si différente de la première */}
                    {totalPages > 1 && (
                      <Button
                        variant={
                          currentPage === totalPages ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        className="w-8 h-8 min-w-0"
                      >
                        {totalPages}
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 animate-in fade-in duration-500">
              <div className="mx-auto w-16 h-16 bg-linear-to-br from-primary/10 to-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun produit ne correspond à vos critères
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                Essayez de modifier vos filtres ou explorez tous nos produits
              </p>
              <Button onClick={resetAllFilters} size="sm" className="gap-2">
                <Sparkles className="w-3 h-3" />
                Voir tous les produits ({cleanedProducts.length})
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
