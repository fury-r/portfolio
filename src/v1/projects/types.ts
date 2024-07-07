export type _MenuItem = {
  title: string;
  desc?: string;
  images?: string[];
  points?: string[];
  techStack?: string[];
  link?: string;
};

export type MenuItem = _MenuItem & {
  subItems?: _MenuItem[];
  iconImage?: string;
};
