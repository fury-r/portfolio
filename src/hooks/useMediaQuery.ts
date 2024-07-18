import { useEffect, useMemo, useState } from "react";
const screens: Record<TScreen, number> = {
  sm: 640,
  md: 900,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
type TScreen = "sm" | "md" | "lg" | "xl" | "2xl";
export const useMediaQuery = (size: TScreen) => {
  const [isSize, setIsSize] = useState(screens[size] >= screen.width);

  useEffect(() => {
    const resize = () => {
      const flag = screens[size] >= window.innerWidth;
      console.log(
        "Resize",
        screens[size] >= window.innerWidth,
        flag !== isSize
      );
      if (flag !== isSize) {
        setIsSize(isSize);
      }
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSize, size, screen.width]);
  return useMemo(() => isSize, [isSize]);
};
