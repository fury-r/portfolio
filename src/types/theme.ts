import { css } from "styled-components";

export type MODE = "DARK" | "LIGHT";

export type TColorTheme = {
  primary: string;
  secondary: string;
  color: string;
  tertiary?: string;
  accent?: string;
  form?: string;
  darkAccent?: string;
  shade?: string;
  shadow1?: string;
  shadow2?: string;
  shadow3?: string;
  rounded?: string;
  bgGradientPrimary?: string;
  accentColor?: string;
  box_shadow_1?: string;
  box_shadow_2?: string;
  border_shadow_1?: string;
  border_shadow_2?: string;
  background?: string;
  theme_text?: string;
  image?: string;
  buttonshadow?: string;
  bordershadow?: string;
  textshadow?: string;
  text_shadow?: string;
  mixins?: {
    flexCenter?: ReturnType<typeof css>;
    flexBetween?: ReturnType<typeof css>;
    link?: ReturnType<typeof css>;
    inlineLink?: ReturnType<typeof css>;
    button?: ReturnType<typeof css>;
    smallButton?: ReturnType<typeof css>;
    bigButton?: ReturnType<typeof css>;
    boxShadow?: ReturnType<typeof css>;
    fancyList?: ReturnType<typeof css>;
    resetList?: ReturnType<typeof css>;
  };
};

export type TNavItem = {
  title: string;
  icon: JSX.Element;
  routes: string;
};
