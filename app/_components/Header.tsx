"use client";

import styled from "styled-components";
import { Chart } from "./Chart";

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  place-content: space-between;
  place-items: center;
  height: 101px;
  background-color: #0F52BA;
  padding-inline: 65px;
`

const Span = styled.span`
  font-weight: 300;
  font-size: 20px;
  line-height: 19px;
`

export function Header() {
  return (
    <Wrapper>
      <h1>MKS <Span>Sistemas</Span></h1>
      <Chart />
    </Wrapper>
  );
}
