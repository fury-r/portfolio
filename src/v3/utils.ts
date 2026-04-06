import React from "react";

export const glass = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "var(--v3-surface)",
    backdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
    WebkitBackdropFilter: "saturate(200%) blur(var(--v3-blur-amt, 28px))",
    border: "1px solid var(--v3-border)",
    ...extra,
});

/**
 * iOS 26 "Liquid Glass" material — translucent with refraction tinting,
 * a bright specular edge, and ambient bloom shadow.
 */
export const liquidGlass = (accent: string, extra?: React.CSSProperties): React.CSSProperties => ({
    background: "var(--v3-liquid-surface, rgba(255,255,255,0.10))",
    backdropFilter: "saturate(var(--v3-liquid-saturate, 280%)) blur(var(--v3-blur-amt, 52px)) brightness(var(--v3-liquid-brightness, 1.06))",
    WebkitBackdropFilter: "saturate(var(--v3-liquid-saturate, 280%)) blur(var(--v3-blur-amt, 52px)) brightness(var(--v3-liquid-brightness, 1.06))",
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
    hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1, y: 0, filter: "none",
        transition: { delay: i * 0.07, type: "spring", stiffness: 200, damping: 20 },
    }),
};

export const pageVariants = {
    initial: { opacity: 0, scale: 0.97, y: 16, filter: "blur(6px)" },
    animate: {
        opacity: 1, scale: 1, y: 0, filter: "none",
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        opacity: 0, scale: 0.97, y: -16, filter: "blur(6px)",
        transition: { duration: 0.22 }
    },
};

export const V3_CSS = [
    "@keyframes v3blob0{0%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.14)}66%{transform:translate(-30px,50px) scale(0.92)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3blob1{0%{transform:translate(0,0) scale(1)}40%{transform:translate(-80px,60px) scale(0.86)}80%{transform:translate(40px,-30px) scale(1.10)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3blob2{0%{transform:translate(0,0) scale(1)}50%{transform:translate(55px,-70px) scale(1.12)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3blob3{0%{transform:translate(0,0) scale(1)}45%{transform:translate(-60px,40px) scale(1.08)}100%{transform:translate(0,0) scale(1)}}",
    "@keyframes v3pa{0%,100%{transform:translate(0,0) scale(1);opacity:.35}50%{transform:translate(22px,-32px) scale(1.3);opacity:.65}}",
    "@keyframes v3pb{0%,100%{transform:translate(0,0) scale(1);opacity:.25}50%{transform:translate(-28px,20px) scale(0.7);opacity:.50}}",
    "@keyframes v3pc{0%,100%{transform:translate(0,0) scale(1);opacity:.40}50%{transform:translate(16px,28px) scale(1.1);opacity:.20}}",
    "@keyframes v3pd{0%,100%{transform:translate(0,0) scale(1);opacity:.30}50%{transform:translate(-18px,-24px) scale(1.2);opacity:.55}}",
    "@keyframes v3shimmer{0%{transform:translateX(-160%) rotate(-20deg);opacity:0}15%{opacity:.7}85%{opacity:.7}100%{transform:translateX(260%) rotate(-20deg);opacity:0}}",
    "@keyframes v3float{0%,100%{transform:translateY(0px) rotate(0deg)}33%{transform:translateY(-7px) rotate(.8deg)}66%{transform:translateY(-3px) rotate(-.8deg)}}",
    "@keyframes v3glow{0%,100%{box-shadow:0 0 8px currentColor}50%{box-shadow:0 0 22px currentColor,0 0 42px currentColor}}",
    "@keyframes v3textShimmer{0%{background-position:0% center}100%{background-position:200% center}}",
    "@keyframes v3cardshine{0%{transform:translateX(-120%) skewX(-20deg)}100%{transform:translateX(220%) skewX(-20deg)}}",
    "@keyframes v3blink{50%{opacity:0}}",
    /* ── iOS 26 Liquid Glass keyframes ─────────────────────────────────── */
    "@keyframes v3liquidpulse{0%,100%{opacity:.55;transform:scale(1) rotate(0deg)}40%{opacity:.75;transform:scale(1.06) rotate(1.2deg)}70%{opacity:.60;transform:scale(0.97) rotate(-0.8deg)}}",
    "@keyframes v3caustic{0%{background-position:0% 0%}33%{background-position:60% 40%}66%{background-position:100% 80%}100%{background-position:0% 0%}}",
    "@keyframes v3specularslide{0%{transform:translateX(-180%) rotate(-25deg) skewX(-10deg);opacity:0}20%{opacity:.9}80%{opacity:.9}100%{transform:translateX(280%) rotate(-25deg) skewX(-10deg);opacity:0}}",
    "@keyframes v3irisglow{0%,100%{opacity:.18;transform:scale(1)}50%{opacity:.32;transform:scale(1.12)}}",
    "@keyframes v3borderflow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}",
    "@keyframes v3squirclein{0%{transform:scale(0.88);opacity:0}60%{transform:scale(1.04);opacity:1}100%{transform:scale(1);opacity:1}}",
    "@media(prefers-reduced-motion:reduce){.v3-blob,.v3-particle{animation:none!important}}",
    ".v3-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:48px 48px}",
    ".v3-liquid-border{position:relative}.v3-liquid-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;background:linear-gradient(135deg,rgba(255,255,255,0.50) 0%,rgba(255,255,255,0.08) 40%,rgba(255,255,255,0.25) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:1;animation:v3borderflow 6s linear infinite;background-size:200% 200%}",
].join("\n");
