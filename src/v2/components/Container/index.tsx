import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  border-radius: var(--rounded);
  background-color: var(--secondary);
  border: 1px solid var(--primary);
`;

export const SideBar = styled(motion.aside)`
  border-radius: var(--rounded);
  background-color: var(--secondary);
  border: 1px solid var(--tertiary);
  transition: 0.5 ease-in-out;
  border: 1px solid var(--primary);
  position: -webkit-sticky;
  position: sticky;
  top: 60px;
  max-width: 30%;
  @media (max-width: 800px) {
    top: 0;
    position: initial;
    max-width: 100%;
  }
`;
export const ShadowContainer = styled(motion.div)`
  background-color: var(--bg-gradient-primary);
  content: "";
  border-radius: var(--rounded);
  box-shadow: var(--shadow-2);
  inset: 1px;
  border: 1px solid var(--primary);
`;

export const GradientBox = styled(ShadowContainer)`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0.2px;
    background: var(--bg-gradient-primary);
    border-radius: inherit;
    z-index: -1;
  }
  background: var(--primary);
  z-index: 1;
`;
