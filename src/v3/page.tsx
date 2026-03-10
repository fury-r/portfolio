import ProfileImage from "../assets/profile.jpg";
import { ProjectsMenu } from "../data/project";
import { techData } from "../data/tech";
import { socials } from "../data/socials";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const highlights = [
  "Building performant product UIs with React + TypeScript",
  "Designing full-stack systems with Node.js, GraphQL, and Python",
  "Delivering AI, IoT, and Web3 experiences for production teams",
];

const V3Portfolio = () => {
  const selectedProjects = ProjectsMenu.slice(0, 3);
  const selectedTech = techData.slice(0, 12);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-12 lg:flex-row lg:items-start">
        <div className="flex-1">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            Portfolio v3 • Developer-first UI
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Rajeev Dessai
          </h1>
          <p className="mt-2 text-lg text-slate-300 md:text-xl">
            Software Development Consultant crafting scalable products and
            thoughtful developer experiences.
          </p>

          <div className="mt-6 grid gap-3">
            {highlights.map((item, index) => (
              <div
                key={index + 1}
                className="rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-slate-200 shadow-lg shadow-cyan-950/20"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/rajeevdessai/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              LinkedIn
              <FaArrowUpRightFromSquare />
            </a>
            <a
              href="https://github.com/fury-r"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              GitHub
              <FaArrowUpRightFromSquare />
            </a>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-4 shadow-2xl shadow-cyan-950/30">
            <img
              src={ProfileImage}
              alt="Rajeev Dessai"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-10 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Core Stack Snapshot
          </h2>
          <div className="flex flex-wrap gap-2">
            {selectedTech.map((tech, index) => (
              <span
                key={index + 1}
                className="rounded-full border border-slate-600 bg-slate-950 px-3 py-1 text-sm text-slate-200"
              >
                {tech.title}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Connect</h2>
          <div className="grid gap-2">
            {socials
              .filter((item) => item.href || item.code || item.value)
              .slice(0, 5)
              .map((item, index) => (
                <a
                  key={index + 1}
                  href={item.href || "mailto:rajeev.dessai11@gmail.com"}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noreferrer" : undefined}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  {item.label}
                </a>
              ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-5 text-2xl font-semibold text-white">Featured Work</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {selectedProjects.map((project, index) => (
            <a
              key={index + 1}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-700 bg-slate-900/70 p-5 transition hover:border-cyan-400"
            >
              <h3 className="text-lg font-medium text-white group-hover:text-cyan-200">
                {project.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                {project.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                View project
                <FaArrowUpRightFromSquare />
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

export default V3Portfolio;
