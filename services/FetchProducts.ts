import type { Product } from "@/interfaces";

import { Api } from "@/http";

export class FetchProductsService extends Api {
  async fetchProducts({
    page,
    productQuantity,
    sortBy,
    orderBy,
  }: {
    page: number;
    productQuantity: number;
    sortBy: "id" | "name" | "price";
    orderBy: "ASC" | "DESC";
  }): Promise<{ products: Product[], count: number }> {
    const response = await this.get(
      `/products?page=${page}&rows=${productQuantity}&sortBy=${sortBy}&orderBy=${orderBy}`,
    );

    const products = await response.json();
    return products;
  }
}
