import { createContext } from "react";
import { MenuItem } from "../../projects/types";

export const ModalContext = createContext<{
  data: MenuItem;
  setData?: React.Dispatch<React.SetStateAction<MenuItem | null>>;
}>({
  data: {
    title: "",
  },
});
