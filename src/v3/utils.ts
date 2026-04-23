import React from "react";

export const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "var(--v3-surface)",
    backdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
    WebkitBackdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
    border: "1px solid var(--v3-border)",
    ...extra,
});

/** Parse hex color to rgb triplet */
export const accentRgb = (hex: string): [number, number, number] => {
    const c = hex.length >= 7 ? hex : "#FF9500";
    return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
};

/** hex + alpha → rgba string */
export const accentRgba = (hex: string, alpha: number): string => {
    const [r, g, b] = accentRgb(hex);
    return `rgba(${r},${g},${b},${alpha})`;
};

/** Bento-style glass card */
export const bentoCard = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "var(--v3-surface)",
    backdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
    WebkitBackdropFilter: "saturate(160%) blur(var(--v3-blur-amt, 18px))",
    border: "1px solid var(--v3-border)",
    borderRadius: 20,
    position: "relative" as const,
    overflow: "hidden",
    ...extra,
});

/** Animated shimmer gradient text — trending 2025/26 */
export const shimmerText = (accent: string, glassMode: boolean): React.CSSProperties =>
    glassMode
        ? {
            background: `linear-gradient(110deg, var(--v3-text) 0%, ${accent} 42%, ${accent}cc 55%, var(--v3-text) 100%)`,
            WebkitBackgroundClip: "text" as const,
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% auto",
            animation: "v3textShimmer 5s linear infinite",
        }
        : { color: "var(--v3-text)" };

/**
 * iOS 26 "Liquid Glass" material — translucent with refraction tinting,
 * a bright specular edge, and ambient bloom shadow.
 */
export const liquidGlass = (accent: string, extra?: React.CSSProperties): React.CSSProperties => ({
    background: "var(--v3-liquid-surface, rgba(255,255,255,0.10))",
    backdropFilter: "saturate(var(--v3-liquid-saturate, 180%)) blur(var(--v3-blur-amt, 24px)) brightness(var(--v3-liquid-brightness, 1.04))",
    WebkitBackdropFilter: "saturate(var(--v3-liquid-saturate, 180%)) blur(var(--v3-blur-amt, 24px)) brightness(var(--v3-liquid-brightness, 1.04))",
    border: "1px solid var(--v3-liquid-border, rgba(255,255,255,0.30))",
    boxShadow: [
        "0 8px 32px rgba(0,0,0,0.28)",
        "inset 0 1.5px 0 rgba(255,255,255,0.40)",
        "inset 0 -1px 0 rgba(0,0,0,0.12)",
        "inset 1px 0 0 rgba(255,255,255,0.14)",
        "0 0 0 0.5px rgba(255,255,255,0.12)",
        "0 0 48px " + accent + "22",
    ].join(", "),
    ...extra,
});

/** iOS 26 spring transition — snappy with natural overshoot. */
export const ios26Spring = (delay = 0) =>
    ({ type: "spring" as const, stiffness: 380, damping: 28, mass: 0.8, delay });

/** iOS 26 gentle spring — for larger elements like cards. */
export const ios26SpringSoft = (delay = 0) =>
    ({ type: "spring" as const, stiffness: 220, damping: 22, mass: 1, delay });

export const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.06, type: "spring", stiffness: 260, damping: 24 },
    }),
};

export const pageVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
        opacity: 1, y: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, y: -10,
        transition: { duration: 0.18 }
    },
};

/** Stagger reveal for bento grid cells */
export const bentoFadeIn = {
    hidden: { opacity: 0, scale: 0.93, y: 18 },
    visible: (i: number) => ({
        opacity: 1, scale: 1, y: 0,
        transition: { delay: i * 0.07, type: "spring", stiffness: 240, damping: 22 },
    }),
};

/** Floating label base style for form inputs */
export const floatLabel = (focused: boolean, hasValue: boolean, accent: string): React.CSSProperties => ({
    position: "absolute",
    left: 16,
    top: focused || hasValue ? 6 : "50%",
    transform: focused || hasValue ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
    transformOrigin: "left center",
    color: focused ? accent : "var(--v3-text2)",
    fontSize: 14,
    fontWeight: focused ? 600 : 400,
    pointerEvents: "none",
    transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
    letterSpacing: focused ? 0.2 : 0,
    zIndex: 1,
});

export const V3_CSS = [
    // ── Background blob animations ───────────────────────────────────────────
    "@keyframes v3blob0{0%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.14)}66%{transform:translate(-30px,50px) scale(0.92)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3blob1{0%{transform:translate(0,0) scale(1)}40%{transform:translate(-80px,60px) scale(0.86)}80%{transform:translate(40px,-30px) scale(1.10)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3blob2{0%{transform:translate(0,0) scale(1)}50%{transform:translate(55px,-70px) scale(1.12)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3blob3{0%{transform:translate(0,0) scale(1)}45%{transform:translate(-60px,40px) scale(1.08)}100%{transform:translate(0,0) scale(1)}}",
    // ── Particle animations ──────────────────────────────────────────────────
    "@keyframes v3pa{0%,100%{transform:translate(0,0) scale(1);opacity:.35}50%{transform:translate(22px,-32px) scale(1.3);opacity:.65}}",
    "@keyframes v3pb{0%,100%{transform:translate(0,0) scale(1);opacity:.25}50%{transform:translate(-28px,20px) scale(0.7);opacity:.50}}",
    "@keyframes v3pc{0%,100%{transform:translate(0,0) scale(1);opacity:.40}50%{transform:translate(16px,28px) scale(1.1);opacity:.20}}",
    "@keyframes v3pd{0%,100%{transform:translate(0,0) scale(1);opacity:.30}50%{transform:translate(-18px,-24px) scale(1.2);opacity:.55}}",
    // ── Star twinkle (aurora starfield) ─────────────────────────────────────
    "@keyframes v3twinkle{0%,100%{opacity:0.04;transform:scale(0.6)}45%{opacity:1;transform:scale(1.8)}60%{opacity:0.75;transform:scale(1.3)}}",
    // ── UI effects ───────────────────────────────────────────────────────────
    "@keyframes v3shimmer{0%{transform:translateX(-160%) rotate(-20deg);opacity:0}15%{opacity:.7}85%{opacity:.7}100%{transform:translateX(260%) rotate(-20deg);opacity:0}}",
    "@keyframes v3float{0%,100%{transform:translateY(0px) rotate(0deg)}33%{transform:translateY(-7px) rotate(.8deg)}66%{transform:translateY(-3px) rotate(-.8deg)}}",
    "@keyframes v3glow{0%,100%{box-shadow:0 0 8px currentColor}50%{box-shadow:0 0 22px currentColor,0 0 42px currentColor}}",
    "@keyframes v3textShimmer{0%{background-position:0% center}100%{background-position:200% center}}",
    "@keyframes v3cardshine{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(220%) skewX(-20deg)}}",
    "@keyframes v3blink{50%{opacity:0}}",
    // ── Availability pulse ───────────────────────────────────────────────────
    "@keyframes v3availpulse{0%{transform:scale(1);opacity:1;box-shadow:0 0 0 0 currentColor}70%{transform:scale(1.6);opacity:0;box-shadow:0 0 0 8px transparent}100%{transform:scale(1);opacity:1;box-shadow:0 0 0 0 currentColor}}",
    // ── Stat counter entrance ────────────────────────────────────────────────
    "@keyframes v3statsenter{0%{opacity:0;transform:translateY(10px) scale(0.88)}100%{opacity:1;transform:translateY(0) scale(1)}}",
    // ── Scroll progress bar ──────────────────────────────────────────────────
    "@keyframes v3progpulse{0%,100%{opacity:1}50%{opacity:0.7}}",
    // ── iOS 26 Liquid Glass keyframes ────────────────────────────────────────
    "@keyframes v3liquidpulse{0%,100%{opacity:.55;transform:scale(1) rotate(0deg)}40%{opacity:.75;transform:scale(1.06) rotate(1.2deg)}70%{opacity:.60;transform:scale(0.97) rotate(-0.8deg)}}",
    "@keyframes v3caustic{0%{background-position:0% 0%}33%{background-position:60% 40%}66%{background-position:100% 80%}100%{background-position:0% 0%}}",
    "@keyframes v3specularslide{0%{transform:translateX(-180%) rotate(-25deg) skewX(-10deg);opacity:0}20%{opacity:.9}80%{opacity:.9}100%{transform:translateX(280%) rotate(-25deg) skewX(-10deg);opacity:0}}",
    "@keyframes v3irisglow{0%,100%{opacity:.18;transform:scale(1)}50%{opacity:.32;transform:scale(1.12)}}",
    "@keyframes v3borderflow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
    "@keyframes v3squirclein{0%{transform:scale(0.88);opacity:0}60%{transform:scale(1.04);opacity:1}100%{transform:scale(1);opacity:1}}",
    // ── Gradient border rotate ───────────────────────────────────────────────
    "@keyframes v3gradrotate{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
    // ── Reduced motion ───────────────────────────────────────────────────────
    "@media(prefers-reduced-motion:reduce){.v3-blob,.v3-particle,.v3-star{animation:none!important}}",
    // ── CSS classes ──────────────────────────────────────────────────────────
    ".v3-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:48px 48px}",
    ".v3-liquid-border{position:relative}.v3-liquid-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(255,255,255,0.50) 0%,rgba(255,255,255,0.08) 40%,rgba(255,255,255,0.25) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:1;animation:v3borderflow 6s linear infinite;background-size:200% 200%}",
    ".v3-star{position:absolute;border-radius:50%;pointer-events:none;will-change:transform,opacity}",
    // ── Noise texture overlay on cards ────────────────────────────────────────
    ".v3-noise{position:absolute;inset:0;border-radius:inherit;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\");pointer-events:none;z-index:3;mix-blend-mode:overlay;opacity:0.5}",
    // ── Scroll progress bar ──────────────────────────────────────────────────
    ".v3-scroll-prog{position:sticky;top:0;left:0;height:2px;background:var(--v3-accent);z-index:50;transition:width 0.12s linear;border-radius:0 2px 2px 0}",
    // ── Bento card hover ─────────────────────────────────────────────────────
    ".v3-bento:hover{transform:translateY(-2px);transition:transform 0.22s cubic-bezier(0.22,1,0.36,1)}",
    // ── Availability badge ───────────────────────────────────────────────────
    ".v3-avail-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:currentColor;position:relative}.v3-avail-dot::after{content:'';position:absolute;inset:0;border-radius:50%;background:currentColor;animation:v3availpulse 2s ease-out infinite}",
    // ── Floating label input ─────────────────────────────────────────────────
    ".v3-float-input:focus~.v3-float-label,.v3-float-input:not(:placeholder-shown)~.v3-float-label{top:6px;transform:scale(0.78);color:var(--v3-accent)}",
].join("\n");
