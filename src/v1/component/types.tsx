export type TCompany = {
  name: string;
  duration?: string;
  site: string;
  image?: string;
  title: string;
  icon?: JSX.Element;
  description?: string;
  subItems?: {
    subTitle: string;
    date: string;
  }[];
};
