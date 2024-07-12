import { useContext } from "react";
import { DataContext } from "./Context";

export const useDataContext = () => useContext(DataContext)!;
