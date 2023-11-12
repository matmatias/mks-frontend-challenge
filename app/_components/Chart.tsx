import { useContext } from "react";

import { ChartContext } from "@/contexts";

export function Chart() {
  const chart = useContext(ChartContext);

  console.log(chart);
  return (
    <>
      <div>Carrinho</div>
    </>
  );
}
