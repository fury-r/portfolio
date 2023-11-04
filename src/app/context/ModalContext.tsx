import React, { Children, createContext, useContext, useState } from "react";
import { MenuItem } from "../projects/types";

const ModalContext = createContext<{
  data: MenuItem;
  setData?: React.Dispatch<React.SetStateAction<MenuItem | null>>;
}>({
  data: {
    title: "",
  },
});

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

export const useModalContext = () => useContext(ModalContext);
