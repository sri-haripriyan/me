import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolioArtwork from "@/assets/portfolio-abstract.jpg";

const navigation = [
  { id: "about", label: "About", number: "01" },
  { id: "work", label: "Selected work", number: "02" },
  { id: "experience", label: "Experience", number: "03" },
  { id: "skills", label: "Skills", number: "04" },
  { id: "education", label: "Education", number: "05" },
];

const projects = [
  {
    number: "01",
    name: "Alcognerd",
    kind: "EVENTS, REAL-TIME SYSTEMS",
    summary:
      "A full-stack event platform bringing registrations, paid tickets and live community chat into one place.",
    impact: "70% faster attendance processing",
    stack: ["MERN", "Redis", "BullMQ", "Socket.io", "React Query"],
    url: "https://alcognerd.site",
    icon: Sparkles,
    className: "project-featured",
  },
  {
    number: "02",
    name: "Codebase Q&A + Report Assistant",
    kind: "GENAI, MULTI-AGENT SYSTEMS",
    summary:
      "Ask questions about an uploaded codebase, then route chat, analysis and report requests through a tool-equipped agent team.",
    impact: "Human-reviewed code reports",
    stack: ["Python", "FastAPI", "LangGraph", "RAG", "PostgreSQL"],
    icon: Braces,
    className: "project-agent",
  },
  {
    number: "03",
    name: "Service Marketplace Backend",
    kind: "BACKEND, TESTING",
    summary:
      "REST APIs for an at-home services marketplace, built as a structured Spring Boot training project.",
    impact: "JUnit test coverage",
    stack: ["Java", "Spring Boot", "JUnit"],
    icon: Layers3,
    className: "project-marketplace",
  },
  {
    number: "04",
    name: "Data Cleaning Pipeline",
    kind: "DATA ENGINEERING, SPARK",
    summary:
      "A parallel Databricks pipeline that cleans text data and shapes it into reliable, structured tables.",
    impact: "9 tables processed in parallel",
    stack: ["Databricks", "Apache Spark", "Python", "Pandas"],
    icon: Database,
    className: "project-data",
  },
];

const skillGroups = [
  {
    icon: Terminal,
    title: "Languages",
    skills: ["Java", "C++", "JavaScript", "Python", "SQL"],
  },
  {
    icon: Braces,
    title: "Backend",
    skills: ["Node.js", "Express.js", "Spring Boot", "FastAPI", "REST APIs"],
  },
  {
    icon: Database,
    title: "Data & messaging",
    skills: ["MongoDB", "PostgreSQL", "Redis", "BullMQ", "Kafka · basic"],
  },
  {
    icon: Sparkles,
    title: "AI & data engineering",
    skills: ["RAG", "LangGraph", "Multi-agent systems", "Spark", "Databricks", "Pandas"],
  },
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React.js", "React Query", "Tailwind CSS", "Socket.io"],
  },
  {
    icon: Layers3,
    title: "Tools & foundations",
    skills: ["Git", "GitHub", "JUnit", "AWS · basics", "DSA", "OOP", "DBMS"],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Haripriyan S — Software Engineer & Builder" },
      {
        name: "description",
        content:
          "Portfolio of Sri Haripriyan S, a software engineer building backend systems, full-stack products, and GenAI applications.",
      },
      { property: "og:title", content: "Sri Haripriyan S — Software Engineer & Builder" },
      {
        property: "og:description",
        content:
          "Backend systems, thoughtful full-stack products, and experiments in GenAI by Sri Haripriyan S.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <div
      ref={setNode}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = navigation.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.15, 0.35] },
    );
    sections.forEach((section) => section && observer.observe(section));

    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <div className="scroll-progress" aria-hidden="true" />

      <aside className={`portfolio-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <a className="sidebar-brand" href="#top" onClick={closeMenu} aria-label="Sri Haripriyan home">
          <span className="brand-mark">SH<span>.</span></span>
          <span className="brand-copy">
            <strong>Sri Haripriyan S</strong>
            <small>SOFTWARE ENGINEER</small>
          </span>
        </a>

        <div className="sidebar-caption">EXPLORE</div>
        <nav className="sidebar-nav" aria-label="Portfolio sections">
          {navigation.map((item) => (
            <a
              key={item.id}
              className={`sidebar-link ${activeSection === item.id ? "active" : ""}`}
              href={`#${item.id}`}
              onClick={closeMenu}
            >
              <span className="sidebar-link-number">{item.number}</span>
              <span>{item.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="sidebar-caption">FIND ME AROUND THE WEB</span>
          <div className="sidebar-socials">
            <a href="https://linkedin.com/in/sri-haripriyan" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://github.com/sri-haripriyan" target="_blank" rel="noreferrer" aria-label="GitHub">gh</a>
            <a href="https://leetcode.com/u/sri-hari321/" target="_blank" rel="noreferrer" aria-label="LeetCode">lc</a>
          </div>
          <span className="sidebar-copyright">© 2025 · BUILT WITH INTENTION</span>
        </div>
      </aside>

      <div className="portfolio-main">
        <header className={`mobile-header ${scrolled ? "mobile-header-scrolled" : ""}`}>
          <a href="#top" className="mobile-brand" onClick={closeMenu}>
            <span className="brand-mark">SH<span>.</span></span>
            <span>Sri Haripriyan S</span>
          </a>
          <Button variant="ghost" size="icon" className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        <main id="top">
          <section className="hero-section" aria-labelledby="hero-title">
            <img className="hero-artwork" src={portfolioArtwork} width={1536} height={1024} alt="Layered glass-like geometric forms in electric blue" fetchPriority="high" />
            <div className="hero-artwork-shade" />
            <div className="hero-grid-overlay" aria-hidden="true" />
            <div className="hero-content">
              <div className="eyebrow hero-eyebrow"><span className="status-pulse" /> SOFTWARE ENGINEER <span className="eyebrow-divider">/</span> BACKEND & GENAI</div>
              <h1 id="hero-title">Sri Haripriyan<span className="hero-period">.</span><br /><span className="hero-last-name">S</span></h1>
              <p className="hero-description">I build <span>reliable systems</span>, useful products, and the occasional agent that knows what to do next.</p>
              <div className="hero-actions">
                <Button asChild className="primary-action">
                  <a href="#work">Explore my work <ArrowDownRight aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline" className="contact-action">
                  <a href="mailto:sris.haripriyan@gmail.com"><Mail aria-hidden="true" /> Let’s talk</a>
                </Button>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true"><span>01</span><span className="hero-index-line" /><span>05</span></div>
            <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown aria-hidden="true" /></a>
            <div className="hero-art-credit">SYSTEMS · BUILT TO SCALE</div>
          </section>

          <section id="about" className="portfolio-section about-section">
            <Reveal>
              <div className="section-heading">
                <span className="section-index">01 / A LITTLE ABOUT ME</span>
                <h2>Ideas into <span>systems.</span></h2>
              </div>
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-copy">
                <p className="section-lead">I’m a software engineer who enjoys working where thoughtful backend design meets real people and their real problems.</p>
                <p>From shipping APIs for an intern-management platform to tuning a live event experience, I care about the details that make software faster, steadier, and easier to use. Lately, I’ve been exploring GenAI and multi-agent systems through hands-on projects.</p>
                <a className="text-link" href="mailto:sris.haripriyan@gmail.com">Have a project in mind? <ArrowUpRight aria-hidden="true" /></a>
              </Reveal>
              <Reveal className="metrics-grid" delay={120}>
                <div className="metric-cell"><strong>30<span>+</span></strong><span>REST endpoints shipped</span></div>
                <div className="metric-cell"><strong>70<span>%</span></strong><span>Faster attendance processing</span></div>
                <div className="metric-cell"><strong>360<span>+</span></strong><span>LeetCode problems solved</span></div>
                <div className="metric-cell"><strong>8.3<span>/10</span></strong><span>Computer science CGPA</span></div>
              </Reveal>
            </div>
          </section>

          <section id="work" className="portfolio-section work-section">
            <Reveal>
              <div className="section-heading work-heading">
                <span className="section-index">02 / SELECTED WORK</span>
                <h2>Built to make<br /><span>an impact.</span></h2>
                <p>Side projects, training builds, and solutions shaped around a real use case.</p>
              </div>
            </Reveal>
            <div className="project-list">
              {projects.map((project, index) => {
                const ProjectIcon = project.icon;
                const content = (
                  <>
                    <div className="project-topline">
                      <span className="project-number">{project.number} <span>— {project.kind}</span></span>
                      <span className="project-open" aria-label={project.url ? "Open project" : "Project details"}>
                        <ArrowUpRight aria-hidden="true" />
                      </span>
                    </div>
                    <div className="project-visual" aria-hidden="true">
                      <span className="project-orbit orbit-one" />
                      <span className="project-orbit orbit-two" />
                      <ProjectIcon className="project-symbol" />
                      <span className="project-visual-code">{project.number} / {project.name.split(" ")[0].toUpperCase()}</span>
                    </div>
                    <div className="project-body">
                      <h3>{project.name}</h3>
                      <p>{project.summary}</p>
                      <div className="project-impact"><span className="impact-dot" />{project.impact}</div>
                      <div className="tech-list">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                    </div>
                  </>
                );
                return (
                  <Reveal key={project.number} className={`project-card ${project.className}`} delay={(index % 2) * 110}>
                    {project.url ? <a className="project-link" href={project.url} target="_blank" rel="noreferrer">{content}</a> : <article>{content}</article>}
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="experience" className="portfolio-section experience-section">
            <Reveal>
              <div className="section-heading">
                <span className="section-index">03 / EXPERIENCE</span>
                <h2>Learning by <span>building.</span></h2>
              </div>
            </Reveal>
            <div className="experience-list">
              <Reveal>
                <article className="experience-item">
                  <div className="experience-date">DEC 2024 — FEB 2025<span>REMOTE · INTERNSHIP</span></div>
                  <div className="experience-content">
                    <div className="experience-title-row"><h3>Backend Developer Intern</h3><BriefcaseBusiness aria-hidden="true" /></div>
                    <span className="experience-company">International Institute of SDGs and Public Policy Research</span>
                    <p>Built the backend for an intern-management application serving 100+ research interns, collaborating with 12 interns and 3 admins across 30+ REST endpoints.</p>
                    <ul>
                      <li>Reduced report and PDF generation from 4–5 seconds to 2–2.5 seconds by indexing tasks and tuning MongoDB aggregation pipelines.</li>
                      <li>Developed APIs for assignments, performance tracking, leave policy, attendance, and on-time check-ins.</li>
                      <li>Automated task cleanup, attendance checks, account expiry, and notifications using scheduled jobs.</li>
                    </ul>
                    <div className="experience-stack">Node.js <span>·</span> Express.js <span>·</span> MongoDB <span>·</span> node-cron</div>
                  </div>
                </article>
              </Reveal>
              <Reveal delay={110}>
                <article className="experience-item">
                  <div className="experience-date">OCT 2025 — DEC 2025<span>TRAINING PROGRAM</span></div>
                  <div className="experience-content">
                    <div className="experience-title-row"><h3>Software Engineer Intern</h3><BriefcaseBusiness aria-hidden="true" /></div>
                    <span className="experience-company">HashedIn by Deloitte</span>
                    <p>Completed a structured weekly program in Spring Boot, GenAI, and data engineering, building a hands-on project in each module.</p>
                    <div className="experience-stack">Spring Boot <span>·</span> RAG <span>·</span> Multi-agent systems <span>·</span> Databricks</div>
                  </div>
                </article>
              </Reveal>
            </div>
          </section>

          <section id="skills" className="portfolio-section skills-section">
            <Reveal>
              <div className="section-heading">
                <span className="section-index">04 / TOOLKIT</span>
                <h2>The things I <span>work with.</span></h2>
              </div>
            </Reveal>
            <div className="skills-grid">
              {skillGroups.map((group, index) => {
                const SkillIcon = group.icon;
                return (
                  <Reveal key={group.title} delay={(index % 3) * 80}>
                    <article className="skill-group">
                      <div className="skill-group-heading"><SkillIcon aria-hidden="true" /><h3>{group.title}</h3></div>
                      <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="education" className="portfolio-section education-section">
            <Reveal>
              <div className="section-heading">
                <span className="section-index">05 / EDUCATION & ACHIEVEMENTS</span>
                <h2>Curiosity, <span>on repeat.</span></h2>
              </div>
            </Reveal>
            <div className="education-layout">
              <Reveal className="education-main">
                <article className="education-item">
                  <div className="education-icon"><GraduationCap aria-hidden="true" /></div>
                  <div><div className="education-year">2021 — 2025</div><h3>BE, Computer Science and Engineering</h3><p>Mahendra College of Engineering</p><span className="education-grade">CGPA 8.3 / 10</span></div>
                </article>
                <div className="coursework"><span className="section-index">RELEVANT COURSEWORK</span><p>Data Structures <span>·</span> Object-Oriented Programming <span>·</span> DBMS <span>·</span> Operating Systems <span>·</span> Computer Networks</p></div>
              </Reveal>
              <Reveal className="education-side" delay={110}>
                <article className="school-result"><span>CLASS XII <span>2020 · STATE BOARD, ATTUR</span></span><strong>83.83<span>%</span></strong></article>
                <article className="school-result"><span>CLASS X <span>2018 · STATE BOARD, ATTUR</span></span><strong>93.6<span>%</span></strong></article>
                <a className="leetcode-highlight" href="https://leetcode.com/u/sri-hari321/" target="_blank" rel="noreferrer"><span className="section-index">DAILY PRACTICE, LONG-TERM GROWTH</span><strong>360<span>+</span></strong><span>problems solved on LeetCode</span><ArrowUpRight aria-hidden="true" /></a>
              </Reveal>
            </div>
          </section>

          <footer className="contact-section">
            <Reveal>
              <span className="section-index">HAVE SOMETHING INTERESTING IN MIND?</span>
              <h2>Let’s make it <span>work.</span></h2>
              <p>Good systems start with a good conversation.</p>
              <Button asChild className="primary-action footer-action">
                <a href="mailto:sris.haripriyan@gmail.com">Say hello <ArrowRight aria-hidden="true" /></a>
              </Button>
              <div className="contact-details">
                <a href="mailto:sris.haripriyan@gmail.com"><Mail aria-hidden="true" /> sris.haripriyan@gmail.com</a>
                <div><a href="https://linkedin.com/in/sri-haripriyan" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a><a href="https://github.com/sri-haripriyan" target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a><a href="https://leetcode.com/u/sri-hari321/" target="_blank" rel="noreferrer">LeetCode <ArrowUpRight aria-hidden="true" /></a></div>
              </div>
              <div className="footer-bottom"><span>SRI HARIPRIYAN S · SOFTWARE ENGINEER</span><a href="#top">BACK TO TOP ↑</a></div>
            </Reveal>
          </footer>
        </main>
      </div>

      {menuOpen && <button aria-label="Close navigation overlay" className="mobile-overlay" onClick={closeMenu} />}
    </div>
  );
}
