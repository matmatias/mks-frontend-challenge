import { Chart } from "./Chart";

export function Header() {
  return (
    <header style={{ display: "flex", flexDirection: "row", placeContent: "space-between" }}>
      <div>MKS Sistemas</div>
      <Chart />
    </header>
  );
}
