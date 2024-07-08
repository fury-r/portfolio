import { useContext } from "react";
import { GlobalContext } from "./Context";

export const useGlobalContext = () => useContext(GlobalContext)!;
