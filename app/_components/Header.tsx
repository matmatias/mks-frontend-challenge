import { Chart } from "./Chart";

export function Header() {
  return (
    <header style={{ display: "flex", flexDirection: "row" }}>
      <div>MKS Sistemas</div>
      <Chart />
    </header>
  );
}
