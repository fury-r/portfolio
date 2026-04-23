import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` once `enabled` becomes true.
 * Uses a cubic ease-out curve for a natural deceleration feel.
 */
export function useCountUp(target: number, duration = 1100, enabled = false): number {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number | null>(null);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!enabled || startedRef.current) return;
        startedRef.current = true;
        const startTime = performance.now();
        const tick = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
            setCount(Math.round(eased * target));
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration, enabled]);

    // Reset if target changes
    useEffect(() => {
        setCount(0);
        startedRef.current = false;
    }, [target]);

    return count;
}
