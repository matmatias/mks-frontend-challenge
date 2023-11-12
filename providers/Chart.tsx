import type { ReactNode } from "react";
import type { ChartData, Product } from "@/interfaces";

import { useState } from "react";
import { ChartContext } from "@/contexts";

interface Props {
  children: ReactNode;
}

const NOT_FOUND = -1;

export function ChartProvider({ children }: Props) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  function addProductToChart(product: Product): void {
    const targetProductIndex: number = chartData.findIndex(
      (elem: ChartData) => {
        if (elem.product.id === product.id) {
          return true;
        }
      },
    );

    if (targetProductIndex !== NOT_FOUND) {
      const targetProduct: ChartData = chartData[targetProductIndex];
      setChartData((prev) => {
        prev[targetProductIndex] = {
          product: targetProduct.product,
          quantity: targetProduct.quantity + 1,
        };

        return [...prev];
      });
    } else {
      setChartData((prev) => [...prev, { product: product, quantity: 1 }]);
    }
  }

  function removeProductFromChart(product: Product): void {
    const targetProductIndex: number = chartData.findIndex(
      (elem: ChartData) => {
        if (elem.product.id === product.id) {
          return true;
        }
      },
    );

    if (targetProductIndex === NOT_FOUND) {
      throw Error(
        `Cannot remove product of id ${product.id} because it does not exist in the chart`,
      );
    }

    const targetProduct: ChartData = chartData[targetProductIndex];
    if (targetProduct.quantity === 1) {
      setChartData((prev) =>
        prev.filter((elem) => elem.product.id !== targetProduct.product.id),
      );
      return;
    }

    setChartData((prev) => {
      prev[targetProductIndex] = {
        product: targetProduct.product,
        quantity: targetProduct.quantity - 1,
      };

      return [...prev];
    });
  }

  return (
    <ChartContext.Provider
      value={{
        chartData: chartData,
        addProductToChart: addProductToChart,
        removeProductFromChart: removeProductFromChart,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}
