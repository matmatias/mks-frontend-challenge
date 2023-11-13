import type { ChartData } from "@/interfaces";

import Image from "next/image";
import styled from "styled-components";
import { Fragment, useContext, useState } from "react";

import { ChartContext } from "@/contexts";
import { getFormattedCurrency } from "@/utils";

const ChartOverlay = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  left: 0;
  top: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  background-color: transparent;
  overflow: hidden;
`;

const ChartOverlayFiller = styled.div`
  cursor: pointer;
  flex-grow: 1;
`;

const ChartContainer = styled.div`
  width: 486px;
  height: 100vh;
  background-color: #0f52ba;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: space-between;
  box-shadow: -5px 0px 6px 0px #00000021;
`;

const ChartHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  place-content: space-around;
  color: white;
`;

const ChartTitle = styled.h2`
  font-size: 27px;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
  width: 180px;
  height: 56px;
`;

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

const ProductList = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 1rem;
  overflow-y: scroll;
  max-height: 70%;
`;

const ProductItem = styled.li`
  display: flex;
  position: relative;
  width: 90%;
  flex-direction: row;
  place-items: center;
  place-content: space-around;
  background-color: white;
  box-shadow: -2px 2px 10px 0px #0000000d;
  border-radius: 8px;
  height: 101px;
`;

const ProductName = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
  width: 30%;
`;

const ProductQtyChangerContainer = styled.div`
  width: 50px;
  height: 19px;
  top: 44px;
  left: 212px;
  border-radius: 4px;
  border: 0.3px solid #bfbfbf;
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: space-around;
  font-family: Montserrat;
  font-size: 8px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: 0em;
  text-align: left;
  padding-inline: 2.5px;
`;

const ProductPrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
`;

const ChartFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  place-items: center;
`;

const BuyButton = styled.button`
  background-color: black;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: center;
  font-size: 28px;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: 0px;
  color: white;
`;

export function Chart() {
  const {
    chartData,
    addProductToChart,
    removeProductFromChart,
    purgeProductFromChart,
  } = useContext(ChartContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Button onClick={() => setIsOpen(true)}>
        <ChartIcon>
          <Image src="/chart.svg" width={24} height={24} alt="Chart button" />
        </ChartIcon>
        <Quantity>{getTotalQty(chartData)}</Quantity>
      </Button>

      {isOpen && (
        <ChartOverlay>
          <ChartContainer>
            <div style={{ width: "90%", maxHeight: "90%", overflow: "hidden" }}>
              <ChartHeader>
                <ChartTitle>Carrinho de compras</ChartTitle>
                <button onClick={() => setIsOpen(false)}>
                  <Image
                    src="/close_chart.svg"
                    width={18}
                    height={18}
                    alt={"Close chart button"}
                  />
                </button>
              </ChartHeader>
              <ProductList style={{ paddingTop: "0.9rem" }}>
                {chartData.map((chartProduct: ChartData) => {
                  return (
                    <ProductItem key={chartProduct.product.id}>
                      <button
                        onClick={() =>
                          purgeProductFromChart(chartProduct.product)
                        }
                      >
                        <Image
                          style={{ position: "absolute", top: -10, right: -10 }}
                          src="/close_chart.svg"
                          width={18}
                          height={18}
                          alt={"Close chart button"}
                        />
                      </button>
                      <Image
                        src={chartProduct.product.photo}
                        width={50}
                        height={50}
                        alt={`Picture of ${chartProduct.product.name}`}
                      />
                      <ProductName>{chartProduct.product.name}</ProductName>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "7px",
                        }}
                      >
                        <span>Qtd:</span>
                        <ProductQtyChangerContainer>
                          <button
                            style={{
                              display: "flex",
                              placeItems: "center",
                              placeContent: "center",
                              flexGrow: "1",
                              fontSize: "12px",
                            }}
                            onClick={() => {
                              removeProductFromChart(chartProduct.product);
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{
                              borderLeft: "0.3px solid #bfbfbf",
                              borderRight: "0.3px solid #bfbfbf",
                              paddingInline: "5px",
                            }}
                          >
                            {chartProduct.quantity}
                          </span>
                          <button
                            style={{
                              display: "flex",
                              placeItems: "center",
                              placeContent: "center",
                              flexGrow: "1",
                            }}
                            onClick={() => {
                              addProductToChart(chartProduct.product);
                            }}
                          >
                            +
                          </button>
                        </ProductQtyChangerContainer>
                      </div>
                      <ProductPrice>
                        R$ {chartProduct.product.price}
                      </ProductPrice>
                    </ProductItem>
                  );
                })}
              </ProductList>
            </div>
            <ChartFooter>
              <div
                style={{
                  color: "white",
                  fontSize: "28px",
                  fontWeight: "700",
                  lineHeight: "15px",
                  letterSpacing: "0px",
                  textAlign: "left",
                  width: "80%",
                  display: "flex",
                  flexDirection: "row",
                  placeContent: "space-between",
                }}
              >
                <span>TOTAL: </span>
                <span>{getFormattedCurrency(getTotalPrice(chartData))}</span>
              </div>
              <BuyButton>Finalizar Compra</BuyButton>
            </ChartFooter>
          </ChartContainer>
          <ChartOverlayFiller
            onClick={() => setIsOpen(false)}
          ></ChartOverlayFiller>
        </ChartOverlay>
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
