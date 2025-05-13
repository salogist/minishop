export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  images: string[];
  specifications: {
    [key: string]: string;
  };
  category?: string;
  inStock: boolean;
  isFeatured?: boolean;
  rating: number;
  numReviews: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
  stock?: number;
  colors?: string[];
} 