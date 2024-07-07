import { useState } from "react";
import { ModalContext } from "./Context";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any | null>(null);

  return (
    <ModalContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
