import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  images: string[];
  specifications: {
    screen: {
      size: string;
      resolution: string;
      technology: string;
    };
    camera: {
      main: string;
      selfie: string;
      features: string[];
    };
    battery: {
      capacity: string;
      type: string;
      features: string[];
    };
    storage: {
      ram: string;
      internal: string;
      card: string;
    };
    processor: {
      chipset: string;
      cpu: string;
      gpu: string;
    };
  };
  stock: number;
  colors: Array<{
    name: string;
    code: string;
  }>;
  rating: number;
  numReviews: number;
  createdAt: string;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  totalProducts: number;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  page: 1,
  pages: 1,
  totalProducts: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (
      state,
      action: PayloadAction<{
        products: Product[];
        page: number;
        pages: number;
        totalProducts: number;
      }>
    ) => {
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.totalProducts = action.payload.totalProducts;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setProduct, clearProduct, setLoading, setError } =
  productSlice.actions;

export default productSlice.reducer; 