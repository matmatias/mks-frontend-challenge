import type { ChartData } from "@/interfaces";

import Image from "next/image";
import { Fragment, useContext, useState } from "react";
import styled from "styled-components";

import { ChartContext } from "@/contexts";

const Button = styled.button`
  width: 90px;
  height: 45px;
  background-color: white;
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: space-between;
  border-radius: 8px;
  cursor: pointer;
`;

const ChartIcon = styled.div`
  margin-left: 15px;
`;

const Quantity = styled.span`
  weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin-right: 27px;
`;

export function Chart() {
  const { chartData, addProductToChart, removeProductFromChart } =
    useContext(ChartContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        <ChartIcon>
          <Image
            src="/chart.svg"
            width={19.01}
            height={18}
            alt="Chart button"
          />
        </ChartIcon>
        <Quantity>{getTotalQty(chartData)}</Quantity>
      </Button>

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

function getTotalQty(products: ChartData[]): number {
  return products.reduce((acc: number, curr: ChartData): number => {
    return curr.quantity + acc;
  }, 0);
}
