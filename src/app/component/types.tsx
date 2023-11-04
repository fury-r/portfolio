import { StaticImageData } from "next/image";
import { URL } from "url";

export type TCompany = {
  name: string;
  duration: string;
  site: string;
  image?: StaticImageData;
  role: string;
  icon?: JSX.Element;
};
