"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
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
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllProducts } from "@/lib/data/products";
import type { Product, SortOption, SortDirection } from "@/lib/types/product";

const PRODUCTS_PER_PAGE_OPTIONS = [6, 9, 12, 18] as const;
type ProductsPerPage = (typeof PRODUCTS_PER_PAGE_OPTIONS)[number];

export default function ProduitsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(Infinity); // contrôlé par slider

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState<ProductsPerPage>(9);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Chargement des produits
  useEffect(() => {
    let mounted = true;
    getAllProducts()
      .then((items) => {
        if (mounted) {
          setProducts(items);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement produits", err);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Calculs dérivés
  const maxPriceInData = useMemo(
    () =>
      products.length > 0 ? Math.max(...products.map((p) => p.price)) : 500000,
    [products],
  );

  // Initialisation du slider une seule fois quand les données arrivent
  useEffect(() => {
    if (maxPriceInData > 0 && priceMax === Infinity) {
      setPriceMax(maxPriceInData);
    }
  }, [maxPriceInData]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return Array.from(set).sort();
  }, [products]);

  const categories = useMemo(() => {
    // Si tu veux vraiment des catégories, il faudra les ajouter dans les données ou les déduire
    // Pour l'instant on simule avec "Montures" ou on laisse vide
    return ["Montures", "Lunettes de soleil", "Sport", "Vintage"]; // ← à adapter
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Recherche
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }

    // Marque
    if (filterBrand) {
      result = result.filter((p) => p.brand === filterBrand);
    }

    // Catégories (si implémenté)
    if (selectedCategories.length > 0) {
      // result = result.filter(p => selectedCategories.some(cat => p.category === cat));
      // Pour l'instant désactivé car pas de category dans Product
    }

    // Prix max
    if (priceMax < maxPriceInData) {
      result = result.filter((p) => p.price <= priceMax);
    }

    // Tri
    result.sort((a, b) => {
      let diff = 0;
      if (sortBy === "price") {
        diff = a.price - b.price;
      } else if (sortBy === "name") {
        diff = a.name.localeCompare(b.name, "fr");
      } else {
        // rating fictif pour l'exemple
        const ra = 3.5 + Math.random() * 1.5;
        const rb = 3.5 + Math.random() * 1.5;
        diff = ra - rb;
      }
      return sortDirection === "asc" ? diff : -diff;
    });

    return result;
  }, [
    products,
    searchQuery,
    filterBrand,
    selectedCategories,
    priceMax,
    sortBy,
    sortDirection,
    maxPriceInData,
  ]);

  // Pagination
  const totalResults = filteredAndSorted.length;
  const totalPages = Math.ceil(totalResults / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredAndSorted.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const resetFilters = () => {
    setSearchQuery("");
    setFilterBrand("");
    setSelectedCategories([]);
    setPriceMax(maxPriceInData);
    setCurrentPage(1);
  };

  const hasFilters =
    searchQuery ||
    filterBrand ||
    selectedCategories.length > 0 ||
    priceMax < maxPriceInData;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-10 h-10 text-primary animate-pulse mx-auto mb-4" />
          <p>Chargement de la collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-cyan-500/5 rounded-full blur-3xl -z-10" />

      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* En-tête */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Collection Complète
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Nos Montures
            </h1>
            <p className="text-lg text-muted-foreground">
              {totalResults} montures disponibles
            </p>
          </div>

          {/* Barre de recherche + filtres */}
          <div className="mb-10 bg-card/40 backdrop-blur-sm rounded-xl border border-border/50 p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Rechercher marque ou modèle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  {hasFilters && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-primary/90 text-white rounded-full">
                      Actifs
                    </span>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy("price");
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc",
                    );
                  }}
                  className="gap-2"
                >
                  <SortAsc className="w-4 h-4" />
                  Prix {sortDirection === "asc" ? "↑" : "↓"}
                </Button>
              </div>
            </div>

            {/* Panneau filtres */}
            {isFilterOpen && (
              <div className="mt-6 pt-6 border-t border-border animate-in slide-in-from-top-5 duration-300">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Marques */}
                  <div>
                    <h3 className="font-medium mb-3">Marque</h3>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="w-full p-3 border rounded-lg bg-background"
                    >
                      <option value="">Toutes les marques</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Prix max */}
                  <div>
                    <h3 className="font-medium mb-3">Prix maximum</h3>
                    <div className="space-y-4">
                      <div className="text-lg font-semibold text-primary">
                        Jusqu'à {priceMax.toLocaleString("fr-MG")} Ar
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={maxPriceInData}
                        step={5000}
                        value={priceMax}
                        onChange={(e) => setPriceMax(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0</span>
                        <span>{maxPriceInData.toLocaleString("fr-MG")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Réinitialiser */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="w-full md:w-auto"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Résultats */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product, idx) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block"
                  >
                    <div className="bg-card rounded-xl overflow-hidden border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative aspect-square bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center p-8">
                        {product.thumbnail ? (
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            className="object-contain p-6 transition-transform duration-400 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <span className="text-7xl opacity-40">👓</span>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                        <h3 className="font-semibold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>

                        <div className="mt-auto pt-4">
                          <div className="text-2xl font-bold text-primary">
                            {product.price.toLocaleString("fr-MG")}{" "}
                            <span className="text-base font-normal">
                              {product.currency === "EUR" ? "€" : "Ar"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination simple */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Précédent
                  </Button>

                  <span className="px-4 py-2 text-sm">
                    Page {currentPage} / {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">
                Aucun produit trouvé
              </h3>
              <p className="text-muted-foreground mb-8">
                Essayez de modifier vos critères de recherche ou de filtres.
              </p>
              <Button onClick={resetFilters}>Voir tous les produits</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
