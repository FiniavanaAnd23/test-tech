// lib/data/products.ts
import type {
  Product,
  ProductDetail,
  ProductsListResponse,
  ProductDetailResponse,
} from "@/lib/types/product";

import rawProductsList from "@/lib/products.json";
import rawProductDetails from "@/lib/product_details.json";

// ───────────────────────────────────────────────
// Utilitaires de normalisation
// ───────────────────────────────────────────────

function normalizePrice(raw: any): number {
  let val = 0;
  if (typeof raw === "string") val = parseInt(raw, 10);
  else if (typeof raw === "number") val = raw;
  return Math.max(0, val); // pas de prix négatif
}

function normalizeCurrency(raw: any): string {
  if (raw === "EURO") return "EUR";
  return raw || "MGA";
}

function normalizeString(raw: any, fallback: string): string {
  return typeof raw === "string" && raw.trim() ? raw.trim() : fallback;
}

function normalizeBoolean(raw: any): boolean {
  if (typeof raw === "boolean") return raw;
  if (typeof raw === "string") return raw.toLowerCase() === "true";
  return !!raw;
}

// ───────────────────────────────────────────────
// Normalisation liste produits
// ───────────────────────────────────────────────

function normalizeProduct(raw: any): Product {
  return {
    id: normalizeString(raw.id, `unknown-${Date.now()}`),
    name: normalizeString(
      raw.name,
      `${normalizeString(raw.brand, "Générique")} Monture`,
    ),
    brand: normalizeString(raw.brand, "Collection"),
    price: normalizePrice(raw.price),
    currency: normalizeCurrency(raw.currency),
    thumbnail: normalizeString(raw.thumbnail, ""),
    isAvailable: normalizeBoolean(raw.isAvailable),
  };
}

// ───────────────────────────────────────────────
// Normalisation détail produit
// ───────────────────────────────────────────────

function normalizeProductDetail(raw: any): ProductDetail | null {
  if (!raw?.id) return null;

  return {
    id: normalizeString(raw.id, ""),
    name: normalizeString(raw.name, "Monture sans nom"),
    brand: normalizeString(raw.brand, "Inconnu"),
    description: normalizeString(
      raw.description,
      "Aucune description disponible.",
    ),
    price: normalizePrice(raw.price),
    currency: normalizeCurrency(raw.currency),
    materials: Array.isArray(raw.materials)
      ? raw.materials.filter((m: any) => typeof m === "string")
      : [],
    dimensions:
      raw.dimensions && typeof raw.dimensions === "object"
        ? {
            width: Number(raw.dimensions.width) || 140,
            height: Number(raw.dimensions.height) || 50,
            bridge: Number(raw.dimensions.bridge) || 18,
            unit: "mm" as const,
          }
        : { width: 140, height: 50, bridge: 18, unit: "mm" },
    configurations: {
      frameColors: Array.isArray(raw.configurations?.frameColors)
        ? raw.configurations.frameColors.filter((c: any) => c?.id && c?.hex)
        : [],
      lensTypes: Array.isArray(raw.configurations?.lensTypes)
        ? raw.configurations.lensTypes.filter((l: any) => l?.id)
        : [],
    },
    threeD:
      raw.threeD && raw.threeD.modelUrl
        ? {
            modelUrl: normalizeString(raw.threeD.modelUrl, ""),
            scale: Number(raw.threeD.scale) || 1,
            camera: {
              position: {
                x: Number(raw.threeD.camera?.position?.x) || 0,
                y: Number(raw.threeD.camera?.position?.y) || 0.2,
                z: Number(raw.threeD.camera?.position?.z) || 2.5,
              },
              fov: Number(raw.threeD.camera?.fov) || 45,
            },
          }
        : undefined,
  };
}

// ───────────────────────────────────────────────
// Fetchers publics
// ───────────────────────────────────────────────

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const response = rawProductsList as unknown as ProductsListResponse;

  if (!response?.success || !Array.isArray(response.data)) {
    console.warn("Données liste produits invalides");
    return [];
  }

  const normalized = response.data
    .map(normalizeProduct)
    .filter((p) => p.price > 0 && p.isAvailable)
    .slice(0, limit);

  return normalized;
}

export async function getProductDetail(
  id: string,
): Promise<ProductDetail | null> {
  const response = rawProductDetails as unknown as ProductDetailResponse;

  if (!response?.success || !response.data?.[id]) {
    console.warn(`Détail non trouvé pour id: ${id}`);
    return null;
  }

  const detail = normalizeProductDetail(response.data[id]);
  return detail;
}

export async function getAllProductIds(): Promise<string[]> {
  const response = rawProductDetails as unknown as ProductDetailResponse;
  if (!response?.success || !response.data) return [];
  return Object.keys(response.data);
}

export async function getAllProducts(): Promise<Product[]> {
  const response = rawProductsList as unknown as ProductsListResponse;

  if (!response?.success || !Array.isArray(response.data)) {
    console.warn("Données liste produits invalides");
    return [];
  }

  const normalized = response.data
    .map(normalizeProduct)
    .filter((p) => p.price > 0 && p.isAvailable);

  return normalized;
}


export async function getProductsWithMinimalDetail(): Promise<Product[]> {
  return getAllProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  const allProducts = await getAllProducts();  // ou getFeaturedProducts() si tu préfères limiter
  const found = allProducts.find(p => p.id === id);
  return found ?? null;
}