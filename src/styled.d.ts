// styled.d.ts
import "styled-components";
import { Theme } from "./theme";
import { TColorTheme } from "./types/theme";

declare module "styled-components" {
  export interface DefaultTheme extends TColorTheme {}
}
