import { useCallback } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const useTilt = (maxDeg = 6) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-200, 200], [maxDeg, -maxDeg]);
    const rotateY = useTransform(mouseX, [-300, 300], [-maxDeg, maxDeg]);
    // iOS 26 spring: snappy with natural overshoot
    const sx = useSpring(rotateX, { stiffness: 340, damping: 26, mass: 0.7 });
    const sy = useSpring(rotateY, { stiffness: 340, damping: 26, mass: 0.7 });
    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - r.left - r.width / 2);
        mouseY.set(e.clientY - r.top - r.height / 2);
    }, [mouseX, mouseY]);
    const onLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);
    return { rotateX: sx, rotateY: sy, onMove, onLeave };
};
