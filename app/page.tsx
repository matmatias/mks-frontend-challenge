"use client";

import type { Product } from "@/interfaces";

import { Fragment } from "react";
import { useQuery } from "react-query";

import { FetchProductsService } from "@/services";

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

  return (
    <main>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          {!isError && (
            <div>
              {data!.products.map((prod: Product) => (
                <Fragment key={prod.id}>
                  <div>{prod.id}</div>
                  <div>{prod.name}</div>
                  <div>{prod.photo}</div>
                  <div>{prod.createdAt.toString()}</div>
                  <div>{prod.updatedAt.toString()}</div>
                  <div>{prod.description}</div>
                </Fragment>
              ))}
            </div>
          )}

          {isError && <div>{JSON.stringify(error)}</div>}
        </Fragment>
      )}
    </main>
  );
}
