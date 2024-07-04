import { StaticImageData } from "next/image";

export type TPageVersion = "v1" | "v2";
export type TItem = {
  title: string;
  iconPath: StaticImageData;
  renderOnlyIcon?: boolean;
  percent?: number;
};
