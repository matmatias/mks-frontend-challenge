"use client";

import type { Product, ChartData } from "@/interfaces";

import { createContext } from "react";

interface Props {
  chartData: ChartData[];
  addProductToChart: (product: Product) => void;
  removeProductFromChart: (product: Product) => void;
}

export const ChartContext = createContext<Props | null>(null);

