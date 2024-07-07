import React from "react";
import { TPageVersion } from "../../types/page";

export const GlobalContext = React.createContext<{
  pageVersion: TPageVersion;
  changePageVersion: (page: TPageVersion) => void;
} | null>(null);
