import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Github, Linkedin, Mail, MapPin, Download, CheckCircle2,
  Sparkles, Circle, GraduationCap, Award, BookOpen, ChevronDown,
  Code2, Brain, Cpu
} from "lucide-react";

/* =========================
   Shared UI + Utilities
========================= */

function Section({ id, title, children }: { id: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-10 py-16 md:py-20">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 text-3xl font-bold tracking-tight md:text-4xl"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </section>
  );
}

function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset;
      const sections = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return { id, top: Infinity } as const;
          return { id, top: el.offsetTop } as const;
        })
        .sort((a, b) => a.top - b.top);
      let current = sections[0]?.id;
      for (const s of sections) if (scrollY >= s.top) current = s.id;
      setActive(current || ids[0]);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);
  return active;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================
   Navbar + Progress
========================= */

function Navbar({ sections }: { sections: { id: string; label: string }[] }) {
  const active = useScrollSpy(sections.map((s) => s.id));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-neutral-950/70">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-8 md:px-10 py-3">
        <button onClick={() => scrollToId("home")} className="group inline-flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-semibold tracking-tight">
            Javeria<span className="text-indigo-500"> Anwer</span>
          </span>
        </button>
        <div className="hidden gap-2 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                active === s.id
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Menu"
          >
            <Circle className={`h-5 w-5 transition ${open ? "rotate-45" : "rotate-0"}`} />
          </button>
        </div>
      </nav>
      <ScrollProgress />
      {open && (
        <div className="border-t border-white/10 bg-white/85 px-5 py-3 dark:bg-neutral-950/85 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToId(s.id)}
                className={`rounded-full px-3 py-2 text-sm ${active === s.id ? "bg-neutral-900 text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[45] h-1 origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    />
  );
}

/* =========================
   Decor
========================= */

function Orbs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 110]);
  const y2 = useTransform(scrollY, [0, 800], [0, -120]);
  return (
    <>
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/25 blur-2xl" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-400/25 blur-2xl" />
    </>
  );
}

function LinkDivider({ label }: { label: string }) {
  return (
    <div className="mx-auto -mt-6 mb-12 flex w-full max-w-7xl items-center justify-center">
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <motion.span
          initial={{ y: -8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-xs font-medium shadow dark:bg-neutral-900"
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}

/* =========================
   Sections
========================= */

function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.985]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.88]);
  const previewScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.03]);

  return (
    <Section id="home">
      <Orbs />
      <motion.div
        style={{ scale, opacity }}
        className="relative flex flex-col items-center gap-6 text-center"
      >
        {/* Text Content */}
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
          >
            <CheckCircle2 className="h-4 w-4" /> Open to web dev roles
          </motion.p>

          {/* NEW styled multi-tier heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-5 font-extrabold leading-tight text-neutral-100"
          >
            <span className="block text-[clamp(40px,6vw,60px)]">
              Web Developer
            </span>
            <span className="block text-[clamp(22px,3vw,30px)] font-medium text-neutral-300">
              turning ideas into
            </span>
            <span className="block text-[clamp(32px,4.5vw,44px)] font-bold text-indigo-400 uppercase tracking-tight">
              SLEEK web apps &
            </span>
            <span className="block text-[clamp(32px,4.5vw,44px)] font-bold text-fuchsia-400 uppercase tracking-tight">
              SMART AI experiences
            </span>
            <span className="block text-[clamp(20px,2.5vw,26px)] text-neutral-400 font-medium">
              that just make sense.
            </span>
          </motion.h1>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 flex flex-wrap gap-2 text-xs"
          >
            {["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Python", "TensorFlow"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-3 py-1 text-neutral-700 ring-1 ring-indigo-200/60 dark:text-neutral-200 dark:ring-neutral-700"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToId("projects"); }}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-white shadow-sm shadow-indigo-500/10 transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
            >
              View projects <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Contact me <Mail className="h-4 w-4" />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv/javeria-anwer-cv.pdf`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2 transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Download CV <Download className="h-4 w-4" />
            </a>
            <a
              href="mailto:javeriaanwer91@gmail.com?subject=Hire%20Javeria%20for%20your%20next%20web%20project"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-2 text-white shadow-lg transition hover:brightness-110"
            >
              Hire Me
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <ChevronDown className="h-4 w-4" /> Scroll to explore
          </div>
        </div>
      </motion.div>
    </Section>
  );
}


function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-3 py-1 text-xs ring-1 ring-indigo-200/60 dark:ring-neutral-700">
      {children}
    </span>
  );
}

function About() {
  const items = [
    { title: "Computer Scientist", text: "BSc (Hons) in Computer Science from UET Taxila (CGPA 3.40). Final Year Project: Genify — a gender-based marketing web app using CNN + collaborative filtering.", icon: Cpu },
    { title: "Web Developer", text: "Built and shipped responsive apps in React/Next.js with TypeScript and Tailwind. Comfortable with SQL backends and SharePoint automation.", icon: Code2 },
    { title: "AI Enthusiast", text: "Hands-on with TensorFlow/OpenCV (facial expression recognition) and practical ML integrations for content workflows.", icon: Brain },
  ];
  return (
    <Section id="about" title="About">
      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }}
      >
        {items.map((it) => (
          <motion.div
            key={it.title}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-neutral-100 shadow-sm ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10 blur-2xl" />
            <div className="mb-3 flex items-center gap-2">
              <it.icon className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-semibold">{it.title}</h3>
            </div>
            <p className="text-neutral-300">{it.text}</p>
            <div className="mt-4">
              <Pill>Result-driven</Pill>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function Skills() {
  const skills = [
    { name: "React / TypeScript", level: 0.85 },
    { name: "Next.js", level: 0.75 },
    { name: "Tailwind CSS", level: 0.85 },
    { name: "Framer Motion", level: 0.75 },
    { name: "Python / TensorFlow / OpenCV", level: 0.7 },
    { name: "SQL / SharePoint Automation", level: 0.7 },
  ];
  return (
    <Section id="skills" title="Skills">
      <motion.div
        className="grid gap-8 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
      >
        {skills.map((s) => (
          <motion.div
            key={s.name}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-6 text-neutral-100 ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-neutral-400">{Math.round(s.level * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function EducationCertifications() {
  const education = [
    {
      title: "Bachelor of Science in Computer Science",
      school: "University of Engineering and Technology (UET) Taxila",
      duration: "2019 – 2023",
      details: "Graduated with CGPA 3.40. Final Year Project: Genify – a gender-based marketing web app using CNN + collaborative filtering.",
    },
  ];
  const certifications = [
    { title: "Huawei HCIA-Datacom", issuer: "Huawei", year: "2024", icon: Award },
    { title: "Foundations of Web Development & Cybersecurity", issuer: "Google / Coursera", year: "2024", icon: BookOpen },
    { title: "Full-Stack Web Development Bootcamp", issuer: "Udemy", year: "2024", icon: GraduationCap },
  ];
  return (
    <Section id="education" title="Education & Certifications">
      <div className="mb-10 grid gap-8 md:grid-cols-1">
        {education.map((edu, i) => (
          <motion.div
            key={edu.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-neutral-100 ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          >
            <h3 className="mb-1 text-xl font-semibold">{edu.title}</h3>
            <p className="text-sm text-neutral-400">{edu.school} · {edu.duration}</p>
            <p className="mt-2 text-neutral-300">{edu.details}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
      >
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
            className="flex flex-col items-center rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-center text-neutral-100 ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          >
            <cert.icon className="mb-3 h-8 w-8 text-indigo-400" />
            <h4 className="font-semibold">{cert.title}</h4>
            <p className="text-sm text-neutral-400">{cert.issuer}</p>
            <span className="mt-1 text-xs text-neutral-500">{cert.year}</span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}


/* ---------- Showcase with Screenshots (NEW) ---------- */
function Showcase() {
  const items = [
    {
      img: `${import.meta.env.BASE_URL}projects/p1.jpg`,
      alt: "Trendtial Tech website",
      title: "Trendtial Tech — Company Website",
      desc: "Modern corporate site with responsive layout, smooth page transitions, and clean content architecture.",
      link: "https://trendtialtech.framer.website/"
    },
    {
      img: `${import.meta.env.BASE_URL}projects/p2.jpg`,
      alt: "MGC Developments website",
      title: "MGC Developments — Real Estate Site",
      desc: "Property showcase with lead capture, contact flows, and device-perfect UI.",
      link: "https://mgcdevelopments.com/"
    }
  ];

  return (
    <Section id="showcase" title="Showcase">
      <motion.div
        className="grid gap-8 md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      >
        {items.map((p) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            className="group block overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 text-neutral-100 shadow-sm ring-1 ring-indigo-500/0 transition hover:-translate-y-1 hover:shadow-xl hover:ring-indigo-500/30"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <img src={p.img} alt={p.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-neutral-300">{p.desc}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

function Projects() {
  const more = [
    { title: "Genify (FYP)", desc: "Gender-based marketing web app using CNN + collaborative filtering.", tags: ["Python","TensorFlow","Flask","React"], link: "#" },
    { title: "Facial Expression Recognition", desc: "Real-time emotion detection using CNN and OpenCV.", tags: ["Python","TensorFlow","OpenCV"], link: "#" },
    { title: "IT Support Automation", desc: "SharePoint forms + workflows to route tickets and reduce manual email.", tags: ["SharePoint","Microsoft 365"], link: "#" },
  ];
  return (
    <Section id="projects" title="Projects">
      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
      >
        {more.map((p) => (
          <motion.a
            key={p.title}
            href={p.link}
            whileHover={{ y: -6 }}
            className="group relative block overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-neutral-100 shadow-sm transition-transform duration-300 hover:shadow-xl"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
          >
            <div className="pointer-events-none absolute inset-x-0 -top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70" />
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <ArrowRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-1" />
            </div>
            <p className="mb-4 text-sm text-neutral-300">{p.desc}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-2 py-1 ring-1 ring-indigo-200/60 dark:ring-neutral-700">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

function Experience() {
  const items = [
    { role: "Web Developer & AI Content Specialist · SkilledForce", time: "Jan 2025 — Present", bullets: ["Launched CareerBooster marketing site with responsive UX","Integrated AI tools to automate large-scale content generation","Optimized prompt taxonomies and publishing workflows"] },
    { role: "Web Developer Intern · Trendtial", time: "Oct 2024 — Nov 2024", bullets: ["Built React + TypeScript real estate apps with Tailwind","Improved performance and smooth data handling with SQL backend","Ensured UX consistency across devices"] },
    { role: "MIS Intern · Attock Petroleum Limited (APL)", time: "Jul 2024 — Aug 2024", bullets: ["Configured & troubleshooted systems for onboarding","Customized SharePoint forms/workflows to automate data collection","Streamlined internal processes for the MIS team"] },
  ];
  return (
    <Section id="experience" title="Experience">
      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
      >
        {items.map((e) => (
          <motion.div
            key={e.role}
            variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-6 text-neutral-100 ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{e.role}</h3>
              <span className="text-sm text-neutral-400">{e.time}</span>
            </div>
            <ul className="mt-3 list-inside list-disc space-y-1 text-neutral-300">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "Huawei HCIA-Datacom certified; comfortable with networking basics.", a: "— Certification" },
    { q: "Coursera & Google foundations in web and cybersecurity completed.", a: "— Coursework" },
    { q: "Udemy full-stack bootcamp — practiced end-to-end delivery.", a: "— Training" },
  ];
  return (
    <Section id="testimonials" title="Highlights">
      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: { opacity: 1 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
      >
        {quotes.map((t, i) => (
          <motion.blockquote
            key={i}
            variants={{ hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: { duration: 0.45 } } }}
            className="relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-neutral-100 italic ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          >
            <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-600/10 to-fuchsia-600/10 blur-2xl" />
            “{t.q}”
            <footer className="mt-3 not-italic text-sm text-neutral-400">{t.a}</footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </Section>
  );
}


function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-neutral-100 ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget as HTMLFormElement);
            const name = data.get("name");
            const email = data.get("email");
            const msg = data.get("message");
            window.location.href = `mailto:javeriaanwer91@gmail.com?subject=Portfolio%20contact%20from%20${encodeURIComponent(String(name||""))}&body=${encodeURIComponent(String(msg||""))}%0A%0Afrom: ${encodeURIComponent(String(email||""))}`;
          }}
        >
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input name="name" required className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none transition focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input type="email" name="email" required className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none transition focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea name="message" rows={5} required className="w-full resize-none rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none transition focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-white shadow-sm shadow-indigo-500/10 transition hover:opacity-90 dark:bg-white dark:text-neutral-900">
            Send <Mail className="h-4 w-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-neutral-800/80 bg-neutral-950 p-8 text-neutral-100 ring-1 ring-indigo-500/0 transition-colors hover:ring-indigo-500/30"
        >
          <h3 className="mb-2 text-lg font-semibold">Let’s build something</h3>
          <p className="mb-4 text-neutral-300">Open for freelance projects, roles, and collaborations in web dev and practical AI.</p>
          <div className="flex flex-col gap-2 text-sm">
            <a className="inline-flex items-center gap-2 hover:underline" href="mailto:javeriaanwer91@gmail.com"><Mail className="h-4 w-4" /> javeriaanwer91@gmail.com</a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Islamabad, Pakistan</span>
            <div className="mt-2 flex gap-3">
              <a className="rounded-full border border-neutral-700 px-3 py-1 hover:bg-neutral-900" href="https://github.com/javeria-2002" target="_blank" rel="noreferrer"><Github className="mr-1 inline h-4 w-4" /> GitHub</a>
              <a className="rounded-full border border-neutral-700 px-3 py-1 hover:bg-neutral-900" href="https://linkedin.com/in/javeria-a-377109248" target="_blank" rel="noreferrer"><Linkedin className="mr-1 inline h-4 w-4" /> LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-neutral-500">
      © {new Date().getFullYear()} Javeria Anwer. Built with React, TypeScript, Tailwind & Framer Motion.
    </footer>
  );
}

export default function App() {
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "showcase", label: "Showcase" },   // NEW
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "testimonials", label: "Highlights" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  return (
    <div
      className="min-h-screen scroll-smooth bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-white"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(99,102,241,0.08) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
    >
      <Navbar sections={sections} />
      <main>
        <Hero />
        <About />
        <Skills />
        <LinkDivider label="Education" />
        <EducationCertifications />
        <LinkDivider label="Showcase" />
        <Showcase />
        <LinkDivider label="Projects" />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
