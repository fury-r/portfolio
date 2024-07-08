import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { MODE } from "../../types/theme";
import { BiMoon, BiSun } from "react-icons/bi";
import { omit } from "lodash";

export const Button = styled.button`
  color: var(--color);

  outline: 0;
  border: 0;
  padding: 10px;
  background: var(--secondary);
  border-radius: 30px;

  &:hover {
    border: 1px solid var(--color);
  }
`;

export const ThemeModeButton = (
  props: ButtonHTMLAttributes<any> & {
    mode: MODE;
    children?: ReactNode;
    iconColor?: string;
  }
) => {
  return (
    <Button {...omit(props, ["mode", "accent"])}>
      {props.mode === "DARK" ? (
        <BiSun color={props.iconColor || "white"} />
      ) : (
        <BiMoon color={props.iconColor || "black"} />
      )}
      {props.children}
    </Button>
  );
};
