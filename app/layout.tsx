"use client";

import "./globals.css";
import styled from "styled-components";
import { Providers } from "@/providers";
import { Header } from "./_components";
import { StyledComponentsRegistry } from "@/lib";

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: center;
  height: 34px;
  margin-top: auto;
  background-color: #eeeeee;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <Providers>
          <Header />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
        <Footer>MKS sistemas © Todos os direitos reservados</Footer>
      </body>
    </html>
  );
}
