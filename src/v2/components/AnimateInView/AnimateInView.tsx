import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { CSSProperties } from "styled-components";
// import { useMediaQuery } from "../../../hooks/useMediaQuery";

const AnimateInView = ({
  getStyle,
  children,
  animate = false,
  style,
  className = "",
  id = "",
}: {
  children: React.ReactNode;
  animate?: boolean;
  style?: CSSProperties;
  getStyle?: (isInView: boolean) => CSSProperties;
  className?: string;
  id?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  //   const isMobile = useMediaQuery("md");

  return (
    <div
      id={id}
      className={"" + className}
      style={{
        ...(animate
          ? getStyle
            ? getStyle(isInView)
            : {
                transform: isInView ? "none" : "translateX(-100px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }
          : {}),
        ...style,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default AnimateInView;
