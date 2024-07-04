import { StaticImageData } from "next/image";

export type TCompany = {
  name: string;
  duration: string;
  site: string;
  image?: StaticImageData;
  role: string;
  icon?: JSX.Element;
};
