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
  console.log(screens[size], screen.height);

  const [isSize, setIsSize] = useState(screens[size] >= screen.height);

  useEffect(() => {
    const resize = () => {
      console.log(screens[size], screen.height);
      const flag = screens[size] >= screen.height;
      if (flag !== isSize) {
        setIsSize(isSize);
      }
    };

    window.addEventListener("resize", resize, true);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isSize, size]);
  return useMemo(() => isSize, [isSize]);
};
