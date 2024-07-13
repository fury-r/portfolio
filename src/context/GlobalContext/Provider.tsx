import { ReactNode, useCallback, useMemo, useState } from "react";
import { GlobalContext } from "./Context";
import { TPageVersion } from "../../types/page";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pageVersion, setPageVersion] = useState<TPageVersion>(
    (localStorage.getItem("pageVersion") as TPageVersion) ||
      import.meta.env.VITE_APP_DEFAULT_LANDING ||
      "v2"
  );

  const changePageVersion = useCallback(
    (page: TPageVersion) => {
      if (page !== pageVersion) {
        localStorage.setItem("pageVersion", page);
        setPageVersion(page);
        window.location.href = "/" + page;
      }
    },
    [pageVersion]
  );

  const value = useMemo(
    () => ({ pageVersion, changePageVersion }),
    [changePageVersion, pageVersion]
  );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
