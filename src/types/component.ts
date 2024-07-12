export type TCategorisedPhoto<T> = {
  type: T;
  image: string;
  title: string;
  description: string;
  link: string;
  subItems: string[];
};

export type TCategory = "Mobile" | "Web";

export type TDATA = {
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

export type TCompany = {
  name: string;
  duration?: string;
  link: string;
  title: string;
  lightImage?: any;
  darkImage?: any;
  description?: string;
  subItems?: {
    subTitle: string;
    date: string;
  }[];
};

export type TService = {
  title: string;
  description: string;
  icon: string;
  percentage: number;
};

export type TSocial = {
  href?: string;
  label: string;
  css?: any;
  icon?: string;
  code?: any;
  value?: string;
};

export type TTech = {
  title: string;
  lightIcon?: string;
  darkIcon?: string;
  renderOnlyIcon?: boolean;
};

export type TProject = {
  title: string;
  type: any;
  images: any[];
  link: string;
  description: string;
  techStack: TTech[];
};

export type TEducation = Omit<TCompany, "subItems"> & {
  course: string;
  marks: string;
};
