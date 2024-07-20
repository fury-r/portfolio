import { TColorTheme } from "../../types/theme";

export const dark: TColorTheme = {
  primary: "hsl(0, 0%, 22%)",
  secondary: "hsl(240, 2%, 12%)",
  color: "hsl(0, 0%, 84%)",
  tertiary: "hsl(0, 0%, 7%)",
  accent: "#0FA4AF",
  darkAccent: "hsla(240, 1%, 17%, 0.75)",
  shadow1: "-4px 8px 24px hsla(0, 0%, 0%, 0.125)",
  shadow2: "0 16px 30px hsla(0, 0%, 0%, 0.125)",
  shadow3: "0 16px 40px hsla(0, 0%, 0%, 0.125)",
  bgGradientPrimary:
    "linear-gradient( to bottom right, hsla(240, 1%, 18%, 0.251) 0%, hsla(240, 2%, 11%, 0) 100% ), hsl(240, 2%, 13%)",
};

export const light: TColorTheme = {
  primary: "#c7c7c7",
  secondary: "#e1e1e0",
  color: "#244855",
  tertiary: "#ededed",
  accent: "#3D52A0",
  darkAccent: "hsl(0deg 0% 80.94% / 75%)",
  shadow1: "-4px 8px 24px hsla(0, 0%, 100%, 0.125)",
  shadow2: "0 16px 30px hsla(0, 0%, 100%, 0.125)",
  shadow3: "0 16px 40px hsla(0, 0%, 100%, 0.125)",
  bgGradientPrimary:
    "linear-gradient(to right bottom, rgb(105 105 102 / 25%) 0%, rgb(205 205 196 / 0%) 100%), rgb(255 255 255)",
};
