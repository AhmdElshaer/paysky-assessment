export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  token: string;
}

export type Category = string;

export interface SearchResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}