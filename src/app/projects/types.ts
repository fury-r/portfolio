import { StaticImageData } from "next/image";

export type _MenuItem = {
    title: string;
    desc?: string;
    images?: StaticImageData[];
    points?: string[];
  };
  
 export type MenuItem = _MenuItem & {
    subItems?: _MenuItem[];
    iconImage:StaticImageData;
  
  };