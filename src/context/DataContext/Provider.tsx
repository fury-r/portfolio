import { ReactNode, useMemo } from "react";
import { DataContext } from "./Context";
import { useContentFul } from "./hooks/useContentFul";

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const contentful = useContentFul();

  const value = useMemo(() => contentful, [contentful]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
