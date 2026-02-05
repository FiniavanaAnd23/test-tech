"use client";

import { use } from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/lib/cart-context"; // suppose que tu as ce context

import productsList from "@/lib/products.json";
import productDetails from "@/lib/product_details.json";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Résout la Promise (Next.js 14+)

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedLensId, setSelectedLensId] = useState<string>("");

  // Récupération des données
  const listItem = productsList.data.find((p: any) => p.id === id);

  const detailItem = (productDetails.data as Record<string, any>)?.[id];

  // Fallbacks si détails manquants
  const product = useMemo(() => {
    if (!listItem) return null;

    const basePrice =
      typeof listItem.price === "string"
        ? parseInt(listItem.price, 10) || 0
        : typeof listItem.price === "number" && listItem.price > 0
          ? listItem.price
          : Math.abs(listItem.price || 0);

    return {
      id: listItem.id,
      name: detailItem?.name || listItem.name || `${listItem.brand} Monture`,
      brand: detailItem?.brand || listItem.brand || "Inconnu",
      description: detailItem?.description || "Description non disponible.",
      basePrice,
      currency: detailItem?.currency || listItem.currency || "MGA",
      materials: detailItem?.materials || [],
      dimensions: detailItem?.dimensions || null,
      frameColors: detailItem?.configurations?.frameColors || [],
      lensTypes: detailItem?.configurations?.lensTypes || [],
      thumbnail: listItem.thumbnail || "/images/placeholder.png",
    };
  }, [listItem, detailItem]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Produit non trouvé</h1>
        <Link
          href="/products"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ChevronLeft size={20} />
          Retour à la boutique
        </Link>
      </div>
    );
  }

  // Valeurs par défaut pour les sélections
  const defaultColor = product.frameColors[0]?.id || "";
  const defaultLens = product.lensTypes[0]?.id || "";

  const currentColorId = selectedColorId || defaultColor;
  const currentLensId = selectedLensId || defaultLens;

  const selectedColor = product.frameColors.find(
    (c) => c.id === currentColorId,
  );
  const selectedLens = product.lensTypes.find((l) => l.id === currentLensId);

  const extraLensPrice = selectedLens?.price || 0;
  const totalPrice = product.basePrice + extraLensPrice;

  const handleAddToCart = () => {
    if (!currentColorId || !currentLensId) {
      alert("Veuillez choisir une couleur et un type de verre.");
      return;
    }

    addItem({
      id: `${product.id}-${currentColorId}-${currentLensId}`,
      name: `${product.name} — ${selectedColor?.label || "Standard"}`,
      price: totalPrice,
      quantity,
      currency: product.currency,
      color: selectedColor?.label,
      lens: selectedLens?.label,
    });

    alert("Article ajouté au panier !");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft size={18} />
            Retour aux produits
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Zone visuelle (image + futur essayage virtuel) */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl overflow-hidden border border-border aspect-square relative">
                {product.thumbnail && product.thumbnail !== "" ? (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl bg-secondary/30">
                    👓
                  </div>
                )}
              </div>

              {/* CTA principal : Essayer cette monture */}
              <button
                type="button"
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 text-lg"
                onClick={() => alert("Essayage virtuel à venir...")}
              >
                <Eye size={22} />
                Essayer cette monture
              </button>
            </div>

            {/* Panneau de configuration */}
            <div className="space-y-8">
              <div>
                <p className="text-lg text-muted-foreground">{product.brand}</p>
                <h1 className="text-3xl sm:text-4xl font-light mt-1">
                  {product.name}
                </h1>

                <p className="text-3xl font-light text-primary mt-4">
                  {totalPrice.toLocaleString("fr-FR")} {product.currency}
                </p>
                {extraLensPrice > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    (dont +{extraLensPrice.toLocaleString("fr-FR")} pour les
                    verres)
                  </p>
                )}
              </div>

              <div className="prose prose-neutral max-w-none">
                <p>{product.description}</p>
              </div>

              {/* Couleurs de monture */}
              {product.frameColors.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Couleur de la monture</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.frameColors.map((color: any) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColorId(color.id)}
                        className={`
                          w-12 h-12 rounded-full border-2 transition-all
                          ${
                            currentColorId === color.id
                              ? "border-accent ring-2 ring-accent/30"
                              : "border-transparent hover:border-accent/50"
                          }
                        `}
                        style={{ backgroundColor: color.hex }}
                        title={color.label}
                        aria-label={`Choisir ${color.label}`}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-muted-foreground">
                      Couleur sélectionnée :{" "}
                      <strong>{selectedColor.label}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Types de verres */}
              {product.lensTypes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Type de verres</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.lensTypes.map((lens: any) => (
                      <button
                        key={lens.id}
                        onClick={() => setSelectedLensId(lens.id)}
                        className={`
                          px-5 py-3 rounded-lg border text-left transition-all
                          ${
                            currentLensId === lens.id
                              ? "border-accent bg-accent/10 ring-1 ring-accent"
                              : "border-border hover:border-accent/50 bg-card"
                          }
                        `}
                      >
                        <div className="font-medium">{lens.label}</div>
                        {lens.price > 0 ? (
                          <div className="text-sm text-accent">
                            +{lens.price.toLocaleString("fr-FR")}{" "}
                            {product.currency}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Inclus
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité + Ajouter au panier */}
              <div className="pt-6 border-t border-border space-y-6">
                <div className="flex items-center gap-6">
                  <div>
                    <label className="block text-sm mb-2">Quantité</label>
                    <div className="flex border border-border rounded overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span className="w-14 h-12 flex items-center justify-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-3 text-lg"
                  >
                    <ShoppingCart size={20} />
                    Ajouter au panier
                  </button>
                </div>
              </div>

              {/* Infos supplémentaires */}
              {product.materials.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Matériaux : {product.materials.join(" • ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
