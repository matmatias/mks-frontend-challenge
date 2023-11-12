"use client";

import type { Product } from "@/interfaces";

import { useContext } from "react";
import { useQuery } from "react-query";

import { FetchProductsService } from "@/services";
import { ChartContext } from "@/contexts";

export default function Home() {
  const fetchProductsService = new FetchProductsService();
  const queryParams = {
    page: 1,
    productQuantity: 10,
    sortBy: "id" as "id",
    orderBy: "ASC" as "ASC",
  };

  const { isLoading, isError, data, error } = useQuery<
    { products: Product[]; count: number },
    Error
  >(["products", queryParams], () =>
    fetchProductsService.fetchProducts(queryParams),
  );

  const { _, addProductToChart } =
    useContext(ChartContext);

  return (
    <main>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section>
          {!isError && (
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {data!.products.map((prod: Product) => (
                <li key={prod.id}>
                  <div>{prod.id}</div>
                  <div>{prod.name}</div>
                  <div>{prod.photo}</div>
                  <div>{prod.createdAt.toString()}</div>
                  <div>{prod.updatedAt.toString()}</div>
                  <div>{prod.description}</div>
                  <div>R$ {prod.price}</div>
                  <button onClick={() => addProductToChart(prod)}>
                    Comprar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {isError && <div>{JSON.stringify(error)}</div>}
        </section>
      )}
    </main>
  );
}
