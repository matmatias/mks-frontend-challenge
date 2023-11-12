import type { ChartData } from "@/interfaces";

import { Fragment, useContext, useState } from "react";

import { ChartContext } from "@/contexts";

export function Chart() {
  const { chartData, addProductToChart, removeProductFromChart } =
    useContext(ChartContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div onClick={() => setIsOpen((prev) => !prev)}>Carrinho</div>
      {isOpen && (
        <Fragment>
          <ul>
            {chartData.map((chartProduct: ChartData) => {
              return (
                <li key={chartProduct.product.id}>
                  <div>{chartProduct.product.name}</div>
                  <div>R$ {chartProduct.product.price}</div>
                  <button
                    onClick={() => {
                      addProductToChart(chartProduct.product);
                    }}
                  >
                    +
                  </button>
                  <span>{chartProduct.quantity}</span>
                  <button
                    onClick={() => {
                      removeProductFromChart(chartProduct.product);
                    }}
                  >
                    -
                  </button>
                </li>
              );
            })}
          </ul>
          <b>TOTAL: R$ {getTotalPrice(chartData)}</b>
        </Fragment>
      )}
    </Fragment>
  );
}

function getTotalPrice(products: ChartData[]): number {
  return products.reduce((acc: number, curr: ChartData): number => {
    return parseFloat(curr.product.price) * curr.quantity + acc;
  }, 0);
}
