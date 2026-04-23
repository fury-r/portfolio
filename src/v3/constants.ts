import React from "react";
import { FiUser, FiFileText, FiMail } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { CiMobile3, CiServer } from "react-icons/ci";
import { SiWebpack } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { Routes as RoutePaths } from "./Routes/path";

export const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
    "mobile-app-dev": React.createElement(CiMobile3, { size: 26 }),
    "webDev": React.createElement(SiWebpack, { size: 24 }),
    "backend": React.createElement(CiServer, { size: 26 }),
    "backendDev": React.createElement(CiServer, { size: 26 }),
    "photography": React.createElement(FaCamera, { size: 22 }),
};

export const DEFAULT_SERVICE_ICON = React.createElement(VscCode, { size: 24 });

export const COLOR_PRESETS = [
    { label: "Golden Hour", color: "#E8A045" },
    { label: "Warm Dusk", color: "#C97D4E" },
    { label: "Sunlit Wheat", color: "#D4A853" },
    { label: "Amber Glow", color: "#C8832A" },
    { label: "Lavender Field", color: "#9B8BB4" },
    { label: "Soft Lilac", color: "#B8A9C9" },
    { label: "Muted Plum", color: "#7E6E9E" },
    { label: "Dusty Violet", color: "#A593BA" },
    { label: "Sage Green", color: "#7A9E7E" },
    { label: "Earthy Fern", color: "#6B8F71" },
    { label: "Muted Moss", color: "#8A9E7A" },
    { label: "Clay Rose", color: "#C4846A" },
];

export const FALLBACK = {
    name: "Rajeev Dessai",
    position: "Intermediate Software Engineer",
    about: "Software Engineer with 3 years of experience in full-stack web development. Proven ability to work independently and as part of a team to deliver high-quality products on time. Eager to learn new technologies and take on new challenges.",
    email: "rajeevdessai9@gmail.com",
    phone: "+91 7972431714",
    location: "Goa, India",
    github: "https://github.com/fury-r",
    linkedin: "https://www.linkedin.com/in/rajeev-dessai-1497741b0/",
};

export const TYPING_WORDS = ["Full-Stack Developer", "React Specialist", "Mobile Dev", "Problem Solver"];

export const PARTICLES = [
    { id: 0, x: 8, y: 12, s: 3, dur: 14, del: 0, anim: "v3pa" },
    { id: 1, x: 22, y: 38, s: 2, dur: 18, del: 2, anim: "v3pb" },
    { id: 2, x: 45, y: 8, s: 4, dur: 12, del: 1, anim: "v3pc" },
    { id: 3, x: 68, y: 25, s: 2, dur: 20, del: 4, anim: "v3pd" },
    { id: 4, x: 82, y: 55, s: 3, dur: 16, del: 3, anim: "v3pa" },
    { id: 5, x: 15, y: 72, s: 2, dur: 22, del: 5, anim: "v3pb" },
    { id: 6, x: 55, y: 88, s: 4, dur: 15, del: 2, anim: "v3pc" },
    { id: 7, x: 90, y: 10, s: 2, dur: 13, del: 6, anim: "v3pd" },
    { id: 8, x: 33, y: 60, s: 3, dur: 19, del: 1, anim: "v3pa" },
    { id: 9, x: 72, y: 78, s: 2, dur: 17, del: 3, anim: "v3pb" },
];

export interface NavItem { label: string; path: string; icon: React.ReactNode; }
export const NAV_ITEMS: NavItem[] = [
    { label: "About", path: RoutePaths.about.path, icon: React.createElement(FiUser, { size: 16 }) },
    { label: "Résumé", path: RoutePaths.resume.path, icon: React.createElement(FiFileText, { size: 16 }) },
    { label: "Projects", path: RoutePaths.project.path, icon: React.createElement(BsGrid1X2Fill, { size: 14 }) },
    { label: "Contact", path: RoutePaths.contact.path, icon: React.createElement(FiMail, { size: 16 }) },
];
