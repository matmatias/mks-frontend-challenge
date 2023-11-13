import { GlobalContext } from "@/contexts";
import type { ReactNode } from "react";

import { useState } from "react";

interface Props {
  children: ReactNode;
}

export function GlobalProvider({ children }: Props) {
  const [isScrollable, setIsScrollable] = useState<boolean>(true);

  function allowScroll() {
    setIsScrollable(true);
  }

  function disableScroll() {
    setIsScrollable(false);
  }

  return (
    <GlobalContext.Provider
      value={{
        isScrollable: isScrollable,
        allowScroll: allowScroll,
        disableScroll: disableScroll
      }}
    >
      {children} 
    </GlobalContext.Provider>
  );
}
