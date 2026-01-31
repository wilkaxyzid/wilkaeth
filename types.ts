export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}
