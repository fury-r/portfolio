export type MODE = "DARK" | "LIGHT";

export type TColorTheme = {
  primary: string;
  secondary: string;
  color: string;
  tertiary: string;
  accent: string;
  form?: string;
  darkAccent?: string;
  shade?: string;
  shadow1?: string;
  shadow2?: string;
  shadow3?: string;
  rounded?: string;
  bgGradientPrimary?: string;
};

export type TNavItem = {
  title: string;
  icon: JSX.Element;
  routes: string;
};
