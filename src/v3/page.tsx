import ProfileImage from "../assets/profile.jpg";
import { ProjectsMenu } from "../data/project";
import { techData } from "../data/tech";
import { socials } from "../data/socials";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RiSparkling2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { PiBrowserBold } from "react-icons/pi";

const highlights = [
  "Building performant product UIs with React + TypeScript",
  "Designing full-stack systems with Node.js, GraphQL, and Python",
  "Delivering AI, IoT, and Web3 experiences for production teams",
];

const navItems = [
  { id: "home", label: "Home" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
];

const osApps = [
  { id: "profile", label: "Profile" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
] as const;
const osAppIcons: Record<(typeof osApps)[number]["id"], string> = {
  profile: "👤",
  stack: "🧰",
  projects: "🚀",
  connect: "💬",
};

type ViewMode = "portfolio" | "os";
type ThemeMode = "dark" | "light";
type AccentTheme = "cyan" | "violet" | "rose" | "emerald";
type OsAppId = (typeof osApps)[number]["id"];
const FEATURED_PROJECT_COUNT = 6;

const accentThemeMap: Record<
  AccentTheme,
  {
    dark: {
      text: string;
      soft: string;
      softBorder: string;
      strong: string;
      softHover: string;
      ring: string;
      cardHover: string;
      solidButton: string;
      solidButtonHover: string;
      navHover: string;
      activeApp: string;
      blob: string;
    };
    light: {
      text: string;
      soft: string;
      softBorder: string;
      strong: string;
      softHover: string;
      ring: string;
      cardHover: string;
      solidButton: string;
      solidButtonHover: string;
      navHover: string;
      activeApp: string;
      blob: string;
    };
  }
> = {
  cyan: {
    dark: {
      text: "text-cyan-300",
      soft: "bg-cyan-400/10",
      softBorder: "border-cyan-400/30",
      strong: "border-cyan-400/60",
      softHover: "hover:border-cyan-300 hover:text-cyan-200",
      ring: "ring-cyan-400/40",
      cardHover: "hover:border-cyan-400",
      solidButton: "bg-cyan-400 text-slate-950",
      solidButtonHover: "hover:bg-cyan-300",
      navHover: "hover:bg-cyan-400/10",
      activeApp: "bg-cyan-500/20 text-cyan-200",
      blob: "bg-cyan-400/20",
    },
    light: {
      text: "text-cyan-700",
      soft: "bg-cyan-100",
      softBorder: "border-cyan-300",
      strong: "border-cyan-500/70",
      softHover: "hover:border-cyan-500 hover:text-cyan-700",
      ring: "ring-cyan-500/35",
      cardHover: "hover:border-cyan-500",
      solidButton: "bg-cyan-600 text-white",
      solidButtonHover: "hover:bg-cyan-500",
      navHover: "hover:bg-cyan-50",
      activeApp: "bg-cyan-100 text-cyan-700",
      blob: "bg-cyan-300/30",
    },
  },
  violet: {
    dark: {
      text: "text-violet-300",
      soft: "bg-violet-400/10",
      softBorder: "border-violet-400/30",
      strong: "border-violet-400/60",
      softHover: "hover:border-violet-300 hover:text-violet-200",
      ring: "ring-violet-400/40",
      cardHover: "hover:border-violet-400",
      solidButton: "bg-violet-400 text-slate-950",
      solidButtonHover: "hover:bg-violet-300",
      navHover: "hover:bg-violet-400/10",
      activeApp: "bg-violet-500/20 text-violet-200",
      blob: "bg-violet-400/20",
    },
    light: {
      text: "text-violet-700",
      soft: "bg-violet-100",
      softBorder: "border-violet-300",
      strong: "border-violet-500/70",
      softHover: "hover:border-violet-500 hover:text-violet-700",
      ring: "ring-violet-500/35",
      cardHover: "hover:border-violet-500",
      solidButton: "bg-violet-600 text-white",
      solidButtonHover: "hover:bg-violet-500",
      navHover: "hover:bg-violet-50",
      activeApp: "bg-violet-100 text-violet-700",
      blob: "bg-violet-300/30",
    },
  },
  rose: {
    dark: {
      text: "text-rose-300",
      soft: "bg-rose-400/10",
      softBorder: "border-rose-400/30",
      strong: "border-rose-400/60",
      softHover: "hover:border-rose-300 hover:text-rose-200",
      ring: "ring-rose-400/40",
      cardHover: "hover:border-rose-400",
      solidButton: "bg-rose-400 text-slate-950",
      solidButtonHover: "hover:bg-rose-300",
      navHover: "hover:bg-rose-400/10",
      activeApp: "bg-rose-500/20 text-rose-200",
      blob: "bg-rose-400/20",
    },
    light: {
      text: "text-rose-700",
      soft: "bg-rose-100",
      softBorder: "border-rose-300",
      strong: "border-rose-500/70",
      softHover: "hover:border-rose-500 hover:text-rose-700",
      ring: "ring-rose-500/35",
      cardHover: "hover:border-rose-500",
      solidButton: "bg-rose-600 text-white",
      solidButtonHover: "hover:bg-rose-500",
      navHover: "hover:bg-rose-50",
      activeApp: "bg-rose-100 text-rose-700",
      blob: "bg-rose-300/30",
    },
  },
  emerald: {
    dark: {
      text: "text-emerald-300",
      soft: "bg-emerald-400/10",
      softBorder: "border-emerald-400/30",
      strong: "border-emerald-400/60",
      softHover: "hover:border-emerald-300 hover:text-emerald-200",
      ring: "ring-emerald-400/40",
      cardHover: "hover:border-emerald-400",
      solidButton: "bg-emerald-400 text-slate-950",
      solidButtonHover: "hover:bg-emerald-300",
      navHover: "hover:bg-emerald-400/10",
      activeApp: "bg-emerald-500/20 text-emerald-200",
      blob: "bg-emerald-400/20",
    },
    light: {
      text: "text-emerald-700",
      soft: "bg-emerald-100",
      softBorder: "border-emerald-300",
      strong: "border-emerald-500/70",
      softHover: "hover:border-emerald-500 hover:text-emerald-700",
      ring: "ring-emerald-500/35",
      cardHover: "hover:border-emerald-500",
      solidButton: "bg-emerald-600 text-white",
      solidButtonHover: "hover:bg-emerald-500",
      navHover: "hover:bg-emerald-50",
      activeApp: "bg-emerald-100 text-emerald-700",
      blob: "bg-emerald-300/30",
    },
  },
};

const V3Portfolio = () => {
  const selectedProjects = ProjectsMenu.slice(0, FEATURED_PROJECT_COUNT);
  const selectedTech = techData.slice(0, 12);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [accentTheme, setAccentTheme] = useState<AccentTheme>("cyan");
  const [viewMode, setViewMode] = useState<ViewMode>("portfolio");
  const [activeApp, setActiveApp] = useState<OsAppId>("profile");
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const isDark = theme === "dark";

  const accent = useMemo(() => {
    return isDark ? accentThemeMap[accentTheme].dark : accentThemeMap[accentTheme].light;
  }, [accentTheme, isDark]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className={`absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl ${accent.blob}`}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute -right-24 bottom-10 h-80 w-80 rounded-full blur-3xl ${accent.blob}`}
          animate={{ scale: [1.1, 0.95, 1.1], x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-xl transition-colors ${
          isDark ? "border-slate-800/80 bg-slate-950/80" : "border-slate-300/80 bg-slate-100/80"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-3">
          <a href="#home" className={`inline-flex items-center gap-2 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            <BsStars className={accent.text} />
            Rajeev Dessai
          </a>
          <nav
            className={`hidden items-center gap-2 rounded-full border p-1 md:flex ${
              isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-300 bg-white/80"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isDark ? `text-slate-300 ${accent.navHover}` : `text-slate-700 ${accent.navHover}`
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div
              className={`flex items-center gap-1 rounded-full border p-1 ${
                isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-300 bg-white/80"
              }`}
            >
              {(Object.keys(accentThemeMap) as AccentTheme[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-label={`Use ${option} color theme`}
                  onClick={() => setAccentTheme(option)}
                  className={`h-6 w-6 rounded-full border transition ${
                    accentTheme === option
                      ? isDark
                        ? "scale-110 border-white"
                        : "scale-110 border-slate-700"
                      : "border-transparent opacity-80 hover:opacity-100"
                  } ${accentThemeMap[option].light.soft}`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
                isDark ? `border-slate-600 text-slate-200 ${accent.softHover}` : `border-slate-400 text-slate-700 ${accent.softHover}`
              }`}
            >
              {isDark ? <MdLightMode /> : <MdDarkMode />}
              {isDark ? "Light" : "Dark"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setViewMode((prev) => (prev === "portfolio" ? "os" : "portfolio"))}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
                isDark ? `${accent.strong} ${accent.text} ${accent.navHover}` : `${accent.strong} ${accent.text} ${accent.navHover}`
              }`}
            >
              {viewMode === "portfolio" ? <HiOutlineDesktopComputer /> : <PiBrowserBold />}
              {viewMode === "portfolio" ? "OS Mode" : "Portfolio"}
            </motion.button>
          </div>
        </div>
      </header>

      {viewMode === "portfolio" ? (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 pt-10 md:grid-cols-[280px_1fr]">
          <motion.aside
            id="home"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`h-fit rounded-3xl border p-4 shadow-xl md:sticky md:top-24 ${
              isDark ? "border-slate-700 bg-slate-900/85 shadow-slate-950/80" : "border-slate-300 bg-white/90 shadow-slate-300/50"
            }`}
          >
            <img src={ProfileImage} alt="Rajeev Dessai" className={`h-64 w-full rounded-2xl object-cover ring-2 ${accent.ring}`} />
            <h1 className={`mt-4 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Rajeev Dessai</h1>
            <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Software Development Consultant crafting scalable products and thoughtful developer experiences.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://www.linkedin.com/in/rajeevdessai/"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${accent.solidButton} ${accent.solidButtonHover}`}
              >
                LinkedIn <FaArrowUpRightFromSquare />
              </a>
              <a
                href="https://github.com/fury-r"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isDark ? `border-slate-600 text-slate-100 ${accent.softHover}` : `border-slate-400 text-slate-800 ${accent.softHover}`
                }`}
              >
                GitHub <FaArrowUpRightFromSquare />
              </a>
            </div>
          </motion.aside>

          <div className="grid gap-6">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`rounded-3xl border p-6 ${isDark ? "border-slate-700 bg-slate-900/80" : "border-slate-300 bg-white/90"}`}
            >
              <p className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm ${accent.softBorder} ${accent.soft} ${accent.text}`}>
                <RiSparkling2Line />
                Portfolio v3 • v2-style layout + creamy motion
              </p>
              <div className="grid gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.995 }}
                    className={`rounded-xl border px-4 py-3 text-sm shadow transition ${
                      isDark
                        ? `border-slate-700/80 bg-slate-950/60 text-slate-200 ${accent.cardHover}`
                        : `border-slate-300 bg-slate-50 text-slate-700 ${accent.cardHover}`
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <section id="stack" className="grid gap-4 lg:grid-cols-2">
              <motion.div
                whileHover={{ y: -4 }}
                className={`rounded-2xl border p-6 shadow-lg transition ${
                  isDark ? "border-slate-700 bg-slate-900/80" : "border-slate-300 bg-white/90"
                }`}
              >
                <h2 className={`mb-4 text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Core Stack Snapshot</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedTech.map((tech) => (
                    <span
                      key={tech.title}
                      className={`rounded-full border px-3 py-1 text-sm transition ${
                        isDark ? `border-slate-600 bg-slate-950 text-slate-200 ${accent.softHover}` : `border-slate-300 bg-slate-100 text-slate-700 ${accent.softHover}`
                      }`}
                    >
                      {tech.title}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className={`rounded-2xl border p-6 shadow-lg transition ${
                  isDark ? "border-slate-700 bg-slate-900/80" : "border-slate-300 bg-white/90"
                }`}
              >
                <h2 className={`mb-4 text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Connect</h2>
                <div className="grid gap-2">
                  {socials
                    .filter((item) => item.href || item.code || item.value)
                    .slice(0, 5)
                    .map((item) => (
                      <a
                        key={item.label}
                        href={item.href || "mailto:rajeev.dessai11@gmail.com"}
                        target={item.href ? "_blank" : undefined}
                        rel={item.href ? "noreferrer" : undefined}
                        className={`rounded-lg border px-4 py-2 text-sm transition ${
                          isDark ? `border-slate-700 text-slate-200 ${accent.softHover}` : `border-slate-300 text-slate-700 ${accent.softHover}`
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                </div>
              </motion.div>
            </section>

            <section id="projects">
              <h2 className={`mb-5 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Featured Work</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {selectedProjects.map((project, idx) => (
                  <motion.a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -8, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group rounded-2xl border p-5 transition duration-300 ${
                      isDark ? `border-slate-700 bg-slate-900/80 ${accent.cardHover}` : `border-slate-300 bg-white/95 ${accent.cardHover}`
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                  >
                    <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{project.title}</h3>
                    <p className={`mt-2 line-clamp-3 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{project.description}</p>
                    <p className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${accent.text}`}>
                      View project
                      <FaArrowUpRightFromSquare />
                    </p>
                  </motion.a>
                ))}
              </div>
            </section>
          </div>
        </motion.section>
      ) : (
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-20 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className={`relative overflow-hidden rounded-[2.25rem] border p-4 shadow-2xl ${
              isDark ? "border-slate-700/80 bg-slate-900/75" : "border-slate-300/90 bg-white/65"
            } backdrop-blur-2xl`}
          >
            <div
              className={`pointer-events-none absolute inset-0 ${
                isDark
                  ? "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_50%)]"
                  : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.5),transparent_50%)]"
              }`}
            />
            <div
              className={`relative mb-4 flex items-center justify-between rounded-2xl border px-4 py-2 text-sm ${
                isDark ? "border-white/15 bg-slate-950/55 text-slate-200" : "border-white/60 bg-white/70 text-slate-700"
              }`}
            >
              <span>Portfolio OS • {theme} mode • {accentTheme}</span>
              <span>{clock}</span>
            </div>

            <div className="relative grid gap-4">
              <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`order-2 rounded-3xl border p-4 md:order-1 ${
                    isDark ? "border-white/15 bg-slate-950/55" : "border-white/70 bg-white/75"
                  } backdrop-blur-xl`}
                >
                  {activeApp === "profile" && (
                    <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                      <img src={ProfileImage} alt="Rajeev Dessai" className={`h-52 w-full rounded-xl object-cover ring-2 ${accent.ring}`} />
                      <div>
                        <h2 className="text-2xl font-bold">Rajeev Dessai</h2>
                        <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          Software Development Consultant focused on scalable web experiences.
                        </p>
                        <ul className="mt-4 grid gap-2 text-sm">
                          {highlights.map((item) => (
                            <li key={item} className={isDark ? "text-slate-200" : "text-slate-700"}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {activeApp === "stack" && (
                    <div>
                      <h2 className="mb-3 text-xl font-semibold">Installed Stack</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedTech.map((tech) => (
                          <span
                            key={tech.title}
                            className={`rounded-full border px-3 py-1 text-sm ${
                              isDark ? "border-slate-600 bg-slate-900 text-slate-200" : "border-slate-300 bg-slate-100 text-slate-700"
                            }`}
                          >
                            {tech.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeApp === "projects" && (
                    <div>
                      <h2 className="mb-3 text-xl font-semibold">Project Explorer</h2>
                      <div className="grid gap-3 md:grid-cols-2">
                        {selectedProjects.map((project) => (
                          <a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`rounded-xl border p-3 transition ${
                              isDark ? `border-slate-700 ${accent.cardHover}` : `border-slate-300 ${accent.cardHover}`
                            }`}
                          >
                            <p className="font-semibold">{project.title}</p>
                            <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>{project.description}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeApp === "connect" && (
                    <div>
                      <h2 className="mb-3 text-xl font-semibold">Social Console</h2>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {socials
                          .filter((item) => item.href || item.code || item.value)
                          .slice(0, 6)
                          .map((item) => (
                            <a
                              key={item.label}
                              href={item.href || "mailto:rajeev.dessai11@gmail.com"}
                              target={item.href ? "_blank" : undefined}
                              rel={item.href ? "noreferrer" : undefined}
                              className={`rounded-lg border px-3 py-2 text-sm transition ${
                                isDark ? `border-slate-700 text-slate-200 ${accent.softHover}` : `border-slate-300 text-slate-700 ${accent.softHover}`
                              }`}
                            >
                              {item.label}
                            </a>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                <aside
                  className={`order-1 rounded-3xl border p-3 md:order-2 ${
                    isDark ? "border-white/15 bg-slate-950/45" : "border-white/70 bg-white/70"
                  } backdrop-blur-xl`}
                >
                  <div className="mb-2 text-xs uppercase tracking-wider opacity-70">Widgets</div>
                  <div className="grid gap-2">
                    <div
                      className={`rounded-2xl border px-3 py-2 text-sm ${
                        isDark ? "border-white/15 bg-slate-900/60 text-slate-300" : "border-white/80 bg-white/80 text-slate-700"
                      }`}
                    >
                      Active App
                      <p className={`mt-1 text-base font-semibold ${accent.text}`}>
                        {osApps.find((app) => app.id === activeApp)?.label}
                      </p>
                    </div>
                    <div
                      className={`rounded-2xl border px-3 py-2 text-sm ${
                        isDark ? "border-white/15 bg-slate-900/60 text-slate-300" : "border-white/80 bg-white/80 text-slate-700"
                      }`}
                    >
                      Focus Mode
                      <p className="mt-1 text-base font-semibold">{viewMode === "os" ? "Enabled" : "Disabled"}</p>
                    </div>
                  </div>
                </aside>
              </div>

              <div
                className={`mx-auto flex w-fit items-center gap-2 rounded-3xl border px-3 py-2 ${
                  isDark ? "border-white/20 bg-slate-950/55" : "border-white/80 bg-white/80"
                } backdrop-blur-2xl`}
              >
                {osApps.map((app) => (
                  <motion.button
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={app.id}
                    type="button"
                    onClick={() => setActiveApp(app.id)}
                    aria-label={`Open ${app.label} app`}
                    className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl border text-xs transition ${
                      activeApp === app.id
                        ? isDark
                          ? `${accent.activeApp} border-white/20`
                          : `${accent.activeApp} border-white`
                        : isDark
                          ? "border-white/10 bg-slate-900/60 text-slate-200 hover:bg-slate-800/80"
                          : "border-white/80 bg-white/80 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <span className="text-base leading-none">{osAppIcons[app.id]}</span>
                    <span className="mt-1">{app.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
};

export default V3Portfolio;
