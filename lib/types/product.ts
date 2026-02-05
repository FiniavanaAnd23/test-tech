// lib/types/product.ts

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: "MGA" | string;
  thumbnail: string;
  isAvailable: boolean;
  originalPrice?: number;
}

export interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  currency: "MGA" | string;
  materials: string[];
  dimensions: {
    width: number;
    height: number;
    bridge: number;
    unit: "mm";
  };
  configurations: {
    frameColors: Array<{ id: string; label: string; hex: string }>;
    lensTypes: Array<{ id: string; label: string; price: number }>;
  };
  threeD?: {
    modelUrl: string;
    scale: number;
    camera: {
      position: { x: number; y: number; z: number };
      fov: number;
    };
  };
}

export interface ProductsListResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface ProductDetailResponse {
  success: boolean;
  data: Record<string, ProductDetail>;
}

export type SortOption = "name" | "price" | "rating";
export type SortDirection = "asc" | "desc";

export interface ProductFilter {
  search: string;
  brand: string;
  categories: string[];
  priceMax: number;
}
