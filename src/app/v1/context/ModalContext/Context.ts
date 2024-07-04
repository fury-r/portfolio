import { MenuItem } from "@/app/projects/types";
import { createContext } from "react";

export const ModalContext = createContext<{
  data: MenuItem;
  setData?: React.Dispatch<React.SetStateAction<MenuItem | null>>;
}>({
  data: {
    title: "",
  },
});
