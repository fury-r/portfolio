import { ReactNode, useMemo, useState } from "react";
import { GlobalContext } from "./Context";
import { TPageVersion } from "../../types/page";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pageVersion, setPageVersion] = useState<TPageVersion>("v2");

  const changePageVersion = (page: TPageVersion) => {
    setPageVersion(page);
  };

  const value = useMemo(
    () => ({ pageVersion, changePageVersion }),
    [pageVersion]
  );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
