import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "./Context";
import { TPageVersion } from "../../types/page";

const isVersionPath = (version: TPageVersion) =>
  window.location.pathname.startsWith(`/${version}`);

const getVersionFromPath = (): TPageVersion | undefined =>
  (["v1", "v2", "v3"] as const).find((version) =>
    isVersionPath(version)
  );

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathVersion = getVersionFromPath();
  const [pageVersion, setPageVersion] = useState<TPageVersion>(
    pathVersion ||
      (localStorage.getItem("pageVersion") as TPageVersion) ||
      import.meta.env.VITE_APP_DEFAULT_LANDING ||
      "v2"
  );

  const changePageVersion = useCallback(
    (page: TPageVersion) => {
      if (page !== pageVersion || !isVersionPath(page)) {
        localStorage.setItem("pageVersion", page);
        setPageVersion(page);
        window.location.href = "/" + page;
      }
    },
    [pageVersion]
  );

  useEffect(() => {
    const syncPageVersionFromPath = () => {
      const currentPathVersion = getVersionFromPath();
      if (!currentPathVersion) return;
      setPageVersion((prev) => {
        if (prev === currentPathVersion) return prev;
        localStorage.setItem("pageVersion", currentPathVersion);
        return currentPathVersion;
      });
    };

    window.addEventListener("popstate", syncPageVersionFromPath);
    return () => window.removeEventListener("popstate", syncPageVersionFromPath);
  }, []);

  const value = useMemo(
    () => ({ pageVersion, changePageVersion }),
    [changePageVersion, pageVersion]
  );
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
