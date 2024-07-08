export type TCategorisedPhoto<T> = {
  type: T;
  image: string;
  title: string;
  description: string;
  url: string;
  subItems: string[];
};

export type TCategory = "Mobile" | "Web";
