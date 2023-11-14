"use client";

import type { Product } from "@/interfaces";

import Image from "next/image";
import styled from "styled-components";
import { useContext } from "react";
import { useQuery } from "react-query";

import { FetchProductsService } from "@/services";
import { ChartContext } from "@/contexts";
import { getFormattedCurrency } from "@/utils";

const GridContainer = styled.section`
  display: flex;
  flex-direction: row;
  place-content: center;
`;

const Grid = styled.ol`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 22px;
  column-gap: 31px;
`;

const Card = styled.li`
  overflow: hidden;
  box-shadow: 0px 2px 8px 0px #00000022;
  border-radius: 8px;
  width: 218px;
  height: 285px;
  background-color: white;
  display: flex;
  flex-direction: column;
  place-content: space-between;
  place-items: center;
`;

const CardInfoContainer = styled.div`
  padding-left: 14px;
  padding-right: 12px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  place-content: space-between;
  place-items: center;
  height: 38px;
`;

const Name = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #2c2c2c;
  width: 55%;
  height: 38px;
  overflow-x: scroll;
`;

const PriceBox = styled.div`
  background-color: #373737;
  border-radius: 5px;
  height: 26px;
  display: flex;
  padding-inline: 7px;
  flex-direction: row;
  place-content: center;
  place-items: center;
`;

const Price = styled.span`
  font-weight: 700;
  size: 15px;
  line-height: 15px;
  color: white;
`;

const Description = styled.p`
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  color: #2c2c2c;
  height: 35px;
  overflow-x: scroll;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  width: 100%;
  height: 32px;
  background-color: #0f52ba;
  color: white;
  display: flex;
  flex-direction: row;
  place-content: center;
  place-items: center;
  gap: 14px;
`;

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

  const { addProductToChart } = useContext(ChartContext);

  return (
    <main>
      {isLoading ? (
        <GridContainer>
          <div className="loader"></div>
        </GridContainer>
      ) : (
        <GridContainer>
          {!isError && (
            <Grid>
              {data!.products.map((prod: Product) => (
                <Card key={prod.id}>
                  <Image
                    src={prod.photo}
                    width={150}
                    height={150}
                    alt={`Picture of ${prod.name}`}
                  />
                  <CardInfoContainer>
                    <CardHeader>
                      <Name className="hide-scrollbar">{prod.name}</Name>
                      <PriceBox>
                        <Price>
                          {getFormattedCurrency(parseInt(prod.price))}
                        </Price>
                      </PriceBox>
                    </CardHeader>
                    <Description className="hide-scrollbar">
                      {prod.description}
                    </Description>
                  </CardInfoContainer>
                  <Button onClick={() => addProductToChart(prod)}>
                    <Image
                      src="/bag.svg"
                      width={12}
                      height={13.5}
                      alt={"Shopping bag icon"}
                    />
                    Comprar
                  </Button>
                </Card>
              ))}
            </Grid>
          )}

          {isError && <div>{JSON.stringify(error)}</div>}
        </GridContainer>
      )}
    </main>
  );
}
