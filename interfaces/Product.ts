export interface Product {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChartData {
  product: Product;
  quantity: number;
}
