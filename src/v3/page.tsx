import ProfileImage from "../assets/profile.jpg";
import { ProjectsMenu } from "../data/project";
import { techData } from "../data/tech";
import { socials } from "../data/socials";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

type ViewMode = "portfolio" | "os";
type ThemeMode = "dark" | "light";
type OsAppId = (typeof osApps)[number]["id"];

const V3Portfolio = () => {
  const selectedProjects = ProjectsMenu.slice(0, 3);
  const selectedTech = techData.slice(0, 12);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [viewMode, setViewMode] = useState<ViewMode>("portfolio");
  const [activeApp, setActiveApp] = useState<OsAppId>("profile");
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const isDark = theme === "dark";

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
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-xl transition-colors ${
          isDark
            ? "border-slate-800/80 bg-slate-950/80"
            : "border-slate-300/80 bg-slate-100/80"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-6 py-3">
          <a
            href="#home"
            className={`inline-flex items-center gap-2 font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            <BsStars className={isDark ? "text-cyan-300" : "text-indigo-500"} />
            Rajeev Dessai
          </a>
          <nav
            className={`hidden items-center gap-2 rounded-full border p-1 md:flex ${
              isDark
                ? "border-slate-700 bg-slate-900/70"
                : "border-slate-300 bg-white/80"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isDark
                    ? "text-slate-300 hover:bg-slate-800 hover:text-cyan-200"
                    : "text-slate-700 hover:bg-slate-200 hover:text-indigo-700"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
                isDark
                  ? "border-slate-600 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"
                  : "border-slate-400 text-slate-700 hover:border-indigo-500 hover:text-indigo-700"
              }`}
            >
              {isDark ? <MdLightMode /> : <MdDarkMode />}
              {isDark ? "Light" : "Dark"}
            </button>
            <button
              type="button"
              onClick={() =>
                setViewMode((prev) => (prev === "portfolio" ? "os" : "portfolio"))
              }
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${
                isDark
                  ? "border-cyan-400/60 text-cyan-200 hover:bg-cyan-400/10"
                  : "border-indigo-500/70 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {viewMode === "portfolio" ? <HiOutlineDesktopComputer /> : <PiBrowserBold />}
              {viewMode === "portfolio" ? "OS Mode" : "Portfolio"}
            </button>
          </div>
        </div>
      </header>
      {viewMode === "portfolio" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <section
            id="home"
            className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-12 lg:flex-row lg:items-start"
          >
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p
                className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm ${
                  isDark
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                    : "border-indigo-400/30 bg-indigo-400/10 text-indigo-700"
                }`}
              >
                <RiSparkling2Line />
                Portfolio v3 • Developer-first UI
              </p>
              <h1 className={`text-4xl font-bold leading-tight md:text-6xl ${isDark ? "text-white" : "text-slate-900"}`}>
                Rajeev Dessai
              </h1>
              <p className={`mt-2 text-lg md:text-xl ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Software Development Consultant crafting scalable products and
                thoughtful developer experiences.
              </p>

              <div className="mt-6 grid gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    className={`rounded-xl border px-4 py-3 shadow-lg transition ${
                      isDark
                        ? "border-slate-700/80 bg-slate-900/70 text-slate-200 shadow-cyan-950/20 hover:border-cyan-400/50"
                        : "border-slate-300 bg-white text-slate-700 shadow-slate-300/40 hover:border-indigo-400/70"
                    }`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/rajeevdessai/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold transition ${
                    isDark
                      ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                  }`}
                >
                  LinkedIn
                  <FaArrowUpRightFromSquare />
                </a>
                <a
                  href="https://github.com/fury-r"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition ${
                    isDark
                      ? "border-slate-600 text-slate-100 hover:border-cyan-300 hover:text-cyan-200"
                      : "border-slate-400 text-slate-800 hover:border-indigo-500 hover:text-indigo-700"
                  }`}
                >
                  GitHub
                  <FaArrowUpRightFromSquare />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <div
                className={`rounded-3xl border p-4 shadow-2xl ${
                  isDark
                    ? "border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 shadow-cyan-950/30"
                    : "border-slate-300 bg-gradient-to-b from-white to-slate-100 shadow-slate-300/50"
                }`}
              >
                <img
                  src={ProfileImage}
                  alt="Rajeev Dessai"
                  className={`h-full w-full rounded-2xl object-cover ring-2 ${
                    isDark ? "ring-cyan-400/40" : "ring-indigo-400/35"
                  }`}
                />
                <div
                  className={`mt-4 rounded-xl border p-3 text-sm ${
                    isDark
                      ? "border-slate-700/80 bg-slate-900/70 text-slate-200"
                      : "border-slate-300 bg-white/80 text-slate-700"
                  }`}
                >
                  Open to consulting, product engineering, and AI-led platform work.
                </div>
              </div>
            </motion.div>
          </section>

          <section
            id="stack"
            className="mx-auto grid max-w-6xl gap-6 px-6 pb-10 md:grid-cols-2"
          >
            <motion.div
              className={`rounded-2xl border p-6 shadow-lg ${
                isDark
                  ? "border-slate-700 bg-slate-900/70 shadow-slate-950/60"
                  : "border-slate-300 bg-white/80 shadow-slate-300/50"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className={`mb-4 text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                Core Stack Snapshot
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedTech.map((tech) => (
                  <span
                    key={tech.title}
                    className={`rounded-full border px-3 py-1 text-sm transition ${
                      isDark
                        ? "border-slate-600 bg-slate-950 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"
                        : "border-slate-300 bg-slate-100 text-slate-700 hover:border-indigo-500 hover:text-indigo-700"
                    }`}
                  >
                    {tech.title}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={`rounded-2xl border p-6 shadow-lg ${
                isDark
                  ? "border-slate-700 bg-slate-900/70 shadow-slate-950/60"
                  : "border-slate-300 bg-white/80 shadow-slate-300/50"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: 0.08 }}
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
                      className={`rounded-lg border px-4 py-2 transition ${
                        isDark
                          ? "border-slate-700 text-slate-200 hover:border-cyan-300 hover:text-cyan-200"
                          : "border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-700"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
              </div>
            </motion.div>
          </section>

          <section id="projects" className="mx-auto max-w-6xl px-6 pb-20">
            <h2 className={`mb-5 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Featured Work</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {selectedProjects.map((project, idx) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`group rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "border-slate-700 bg-slate-900/70 hover:border-cyan-400 hover:shadow-cyan-950/20"
                      : "border-slate-300 bg-white/90 hover:border-indigo-500 hover:shadow-slate-300/50"
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: idx * 0.07 }}
                >
                  <h3 className={`text-lg font-medium ${isDark ? "text-white group-hover:text-cyan-200" : "text-slate-900 group-hover:text-indigo-700"}`}>
                    {project.title}
                  </h3>
                  <p className={`mt-2 line-clamp-3 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {project.description}
                  </p>
                  <p className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${isDark ? "text-cyan-300" : "text-indigo-700"}`}>
                    View project
                    <FaArrowUpRightFromSquare />
                  </p>
                </motion.a>
              ))}
            </div>
          </section>
        </motion.div>
      ) : (
        <motion.section
          className="mx-auto max-w-6xl px-6 pb-20 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className={`rounded-3xl border p-4 shadow-2xl ${
              isDark
                ? "border-slate-700 bg-slate-900/85 shadow-cyan-950/20"
                : "border-slate-300 bg-white/90 shadow-slate-300/40"
            }`}
          >
            <div
              className={`mb-4 flex items-center justify-between rounded-xl border px-4 py-2 text-sm ${
                isDark ? "border-slate-700 bg-slate-950 text-slate-300" : "border-slate-300 bg-slate-100 text-slate-700"
              }`}
            >
              <span>Portfolio OS • {theme} mode</span>
              <span>{clock}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <aside
                className={`rounded-2xl border p-3 ${
                  isDark ? "border-slate-700 bg-slate-950/80" : "border-slate-300 bg-slate-100"
                }`}
              >
                <div className="mb-2 text-xs uppercase tracking-wider opacity-70">Apps</div>
                <div className="grid gap-2">
                  {osApps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setActiveApp(app.id)}
                      className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                        activeApp === app.id
                          ? isDark
                            ? "bg-cyan-500/20 text-cyan-200"
                            : "bg-indigo-100 text-indigo-700"
                          : isDark
                            ? "text-slate-300 hover:bg-slate-800"
                            : "text-slate-700 hover:bg-white"
                      }`}
                    >
                      {app.label}
                    </button>
                  ))}
                </div>
              </aside>

              <motion.div
                key={activeApp}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border p-4 ${
                  isDark ? "border-slate-700 bg-slate-950/80" : "border-slate-300 bg-white"
                }`}
              >
                {activeApp === "profile" && (
                  <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                    <img src={ProfileImage} alt="Rajeev Dessai" className="h-52 w-full rounded-xl object-cover" />
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
                            isDark
                              ? "border-slate-700 hover:border-cyan-400"
                              : "border-slate-300 hover:border-indigo-500"
                          }`}
                        >
                          <p className="font-semibold">{project.title}</p>
                          <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                            {project.description}
                          </p>
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
                              isDark
                                ? "border-slate-700 text-slate-200 hover:border-cyan-300"
                                : "border-slate-300 text-slate-700 hover:border-indigo-500"
                            }`}
                          >
                            {item.label}
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
};

export default V3Portfolio;
