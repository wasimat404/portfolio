"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import TechBackground from "@/components/TechBackground";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  const aboutText = useMemo(
    () =>
      `Hey! I'm Wasim. Need help fixing your issues? Building something from scratch? Solving that problem nobody else can crack? I've got you covered. From tech headaches to creative builds, I turn your "impossible" into "done." Let's make it happen—everything you need solved, right here.`,
    []
  );

  const links = useMemo(
    () => ({
      linkedin: "https://www.linkedin.com/in/wasim-akram-4894071b0",
      github: "https://github.com/wasimat404",
      email: "wasimat404@gmail.com",
    }),
    []
  );

  const services = [
    "Build your dream website",
    "Develop custom mobile apps",
    "Create powerful web applications",
    "Scale your business with cloud solutions",
    "Build AI chatbots and assistants",
    "Develop machine learning models",
    "Automate with AI-powered tools",
    "Create intelligent recommendation systems",
    "Deploy and manage your infrastructure",
    "Integrate AI into your existing systems",
    "Design smart data analytics solutions",
    "Launch your iOS applications",
    "Build predictive AI solutions",
    "Automate your workflows with AI",
    "Develop computer vision applications",
    "Grow your online presence",
    "Modernize your tech stack",
    "Solve your technical challenges with AI",
  ];

  return (
    <div className="min-h-[100svh] bg-black text-[#e8e6e3]">
      {/* Global animations (safe + clean) */}
      <style jsx global>{`
        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes panelDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes pillIn {
          from {
            opacity: 0;
            transform: translateY(10px);
            clip-path: inset(0 100% 0 0 round 999px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            clip-path: inset(0 0 0 0 round 999px);
          }
        }

        @keyframes sheen {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }

        @keyframes iconPop {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>

      <header className="w-full">
        <div className="mx-auto max-w-7xl px-6 pt-6">
          <Nav
            aboutOpen={aboutOpen}
            setAboutOpen={setAboutOpen}
            worksOpen={worksOpen}
            setWorksOpen={setWorksOpen}
            servicesOpen={servicesOpen}
            setServicesOpen={setServicesOpen}
            connectOpen={connectOpen}
            setConnectOpen={setConnectOpen}
            aboutText={aboutText}
            services={services}
            links={links}
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        <section className="relative flex min-h-[calc(100svh-88px)] items-center justify-center overflow-hidden">
          <TechBackground />

          <div className="relative z-10 w-full text-center">
            <h1 className="text-[clamp(2.8rem,9vw,6.6rem)] font-black leading-[0.88] tracking-[-0.02em]">
              Let&apos;s make you
              <br />
              digital.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
              BUILD YOUR WEBSITE • PERSONAL AI • AUTOMATE WORKFLOW • SCALE YOUR
              BUSINESS
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Nav({
  aboutOpen,
  setAboutOpen,
  worksOpen,
  setWorksOpen,
  servicesOpen,
  setServicesOpen,
  connectOpen,
  setConnectOpen,
  aboutText,
  services,
  links,
}: {
  aboutOpen: boolean;
  setAboutOpen: (v: boolean) => void;
  worksOpen: boolean;
  setWorksOpen: (v: boolean) => void;
  servicesOpen: boolean;
  setServicesOpen: (v: boolean) => void;
  connectOpen: boolean;
  setConnectOpen: (v: boolean) => void;
  aboutText: string;
  services: string[];
  links: { linkedin: string; github: string; email: string };
}) {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const worksRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const connectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setWorksOpen(false);
        setServicesOpen(false);
        setConnectOpen(false);
      }
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;

      if (aboutOpen && aboutRef.current && !aboutRef.current.contains(t))
        setAboutOpen(false);

      if (worksOpen && worksRef.current && !worksRef.current.contains(t))
        setWorksOpen(false);

      if (
        servicesOpen &&
        servicesRef.current &&
        !servicesRef.current.contains(t)
      )
        setServicesOpen(false);

      if (connectOpen && connectRef.current && !connectRef.current.contains(t))
        setConnectOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [
    aboutOpen,
    worksOpen,
    servicesOpen,
    connectOpen,
    setAboutOpen,
    setWorksOpen,
    setServicesOpen,
    setConnectOpen,
  ]);

  const closeAll = () => {
    setAboutOpen(false);
    setWorksOpen(false);
    setServicesOpen(false);
    setConnectOpen(false);
  };

  return (
    <div className="relative">
      <nav className="grid grid-cols-3 items-start">
        <div />

        <div className="justify-self-center">
          <ul className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em]">
            <li>
              <button
                onClick={() => {
                  setAboutOpen(!aboutOpen);
                  setWorksOpen(false);
                  setServicesOpen(false);
                  setConnectOpen(false);
                }}
                className="font-bold text-[#e8e6e3] opacity-90 hover:opacity-70 transition bg-transparent outline-none focus:outline-none focus:ring-0 active:bg-transparent"
              >
                [ ABOUT ME ]
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setWorksOpen(!worksOpen);
                  setAboutOpen(false);
                  setServicesOpen(false);
                  setConnectOpen(false);
                }}
                className="font-bold text-[#e8e6e3] opacity-90 hover:opacity-70 transition bg-transparent outline-none focus:outline-none focus:ring-0 active:bg-transparent"
              >
                [ WORKS ]
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setAboutOpen(false);
                  setWorksOpen(false);
                  setConnectOpen(false);
                }}
                className="font-bold text-[#e8e6e3] opacity-90 hover:opacity-70 transition bg-transparent outline-none focus:outline-none focus:ring-0 active:bg-transparent"
              >
                [ SERVICES ]
              </button>
            </li>
          </ul>
        </div>

        <div className="justify-self-end flex flex-col items-end gap-4 relative">
          <button
            type="button"
            onClick={() => {
              setConnectOpen(!connectOpen);
              setAboutOpen(false);
              setWorksOpen(false);
              setServicesOpen(false);
            }}
            className="group font-mono text-xs uppercase tracking-[0.25em] font-bold text-[#e8e6e3] opacity-90 hover:opacity-70 transition bg-transparent outline-none focus:outline-none focus:ring-0 active:bg-transparent"
          >
            CONNECT{" "}
            <span className="inline-block translate-y-[1px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
              ↗
            </span>
          </button>

          <div className="h-20 w-20 rounded-full border border-white/20 bg-white/10" />

          {connectOpen && (
            <div
              ref={connectRef}
              className="
                absolute right-0 top-10 z-50
                w-[min(360px,92vw)]
                rounded-2xl
                border border-white/12
                bg-black/70 backdrop-blur-xl
                shadow-[0_30px_120px_rgba(0,0,0,0.75)]
                overflow-hidden
              "
              style={{
                animation: "panelDown 420ms cubic-bezier(.2,.9,.2,1) both",
              }}
            >
              <div className="relative px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8e6e3]/75">
                  Connect
                </div>

                <button
                  onClick={closeAll}
                  className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8e6e3]/55 hover:text-[#e8e6e3]/90 transition"
                >
                  Close
                </button>
              </div>

              <div className="relative px-5 py-5">
                <div
                  className="mx-auto h-16 w-16 rounded-full overflow-hidden border border-white/20 bg-white/10"
                  style={{ animation: "iconPop 420ms ease-out both" }}
                >
                  <img
                    src="/wasim.jpg"
                    alt="Wasim"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <div className="h-full w-full grid place-items-center text-[10px] font-mono uppercase tracking-[0.25em] text-[#e8e6e3]/55">
                    me
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <IconLink
                    href={links.linkedin}
                    label="LinkedIn"
                    delayMs={80}
                    icon={<LinkedInIcon />}
                  />
                  <IconLink
                    href={links.github}
                    label="GitHub"
                    delayMs={140}
                    icon={<GitHubIcon />}
                  />
                  <IconLink
                    href={`mailto:${links.email}`}
                    label="Gmail"
                    delayMs={200}
                    icon={<MailIcon />}
                  />
                </div>

                <div className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#e8e6e3]/45">
                  Tap an icon
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {aboutOpen && (
        <Panel refEl={aboutRef} title="About Wasim">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <Typewriter text={aboutText} speedMs={10} />
            </div>
          </div>
        </Panel>
      )}

      {worksOpen && (
        <Panel refEl={worksRef} title="Selected Work">
          <a className="group inline-flex items-center gap-2 text-lg opacity-90 hover:opacity-100 transition">
            Oasis-Library ↗
          </a>
        </Panel>
      )}

      {/* SERVICES (NOW SOLID BLACK) */}
      {servicesOpen && (
        <div
          ref={servicesRef}
          className="
            absolute left-1/2 z-50 mt-4 w-[min(760px,94vw)]
            -translate-x-1/2 rounded-2xl
            border border-white/12
            bg-black
            shadow-[0_30px_120px_rgba(0,0,0,0.75)]
            overflow-hidden
          "
          style={{ animation: "panelIn 420ms cubic-bezier(.2,.9,.2,1) both" }}
        >
          <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8e6e3]/75">
              Services
            </div>

            <button
              onClick={() => setServicesOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8e6e3]/55 hover:text-[#e8e6e3]/90 transition"
            >
              Close
            </button>
          </div>

          <div className="relative px-6 py-5">
            <div className="max-h-[46vh] overflow-auto pr-2">
              <ul className="space-y-2">
                {services.map((s, i) => (
                  <li
                    key={s}
                    className="
                      relative overflow-hidden rounded-full
                      border border-white/10
                      bg-white/5
                      px-4 py-3
                      text-[#e8e6e3]/90
                      hover:bg-white/8 hover:border-white/18
                      transition
                    "
                    style={{
                      animation:
                        "pillIn 520ms cubic-bezier(.2,.9,.2,1) both",
                      animationDelay: `${i * 35}ms`,
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(232,230,227,0.14), transparent)",
                        transform: "translateX(-120%)",
                        animation: "sheen 1.6s ease-in-out infinite",
                        animationDelay: `${i * 80}ms`,
                        opacity: 0.9,
                      }}
                    />

                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e8e6e3]/70" />
                      <span className="font-serif text-[15px] leading-5 tracking-wide">
                        {s}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#e8e6e3]/45">
              Scroll for more
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({
  refEl,
  title,
  children,
}: {
  refEl: React.RefObject<HTMLDivElement>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={refEl}
      className="
        absolute left-1/2 z-50 mt-4 w-[min(620px,92vw)]
        -translate-x-1/2 rounded-2xl border border-white/15
        bg-black/85 backdrop-blur px-6 py-5
        shadow-[0_30px_100px_rgba(0,0,0,0.6)]
      "
      style={{ animation: "panelIn 420ms cubic-bezier(.2,.9,.2,1) both" }}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-70 mb-4">
        {title}
      </div>
      {children}
    </div>
  );
}

function Typewriter({ text, speedMs }: { text: string; speedMs: number }) {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speedMs);
    return () => window.clearInterval(id);
  }, [text, speedMs]);

  return (
    <p className="text-sm leading-6">
      {out}
      <span className="inline-block w-[0.6ch] animate-pulse opacity-70">▍</span>
    </p>
  );
}

/* ---------- CONNECT ICONS ---------- */

function IconLink({
  href,
  label,
  icon,
  delayMs,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  delayMs: number;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="
        group relative
        rounded-xl border border-white/12 bg-white/5
        px-3 py-3
        hover:bg-white/8 hover:border-white/20
        transition
        outline-none focus:outline-none
      "
      style={{
        animation: "iconPop 420ms ease-out both",
        animationDelay: `${delayMs}ms`,
      }}
      aria-label={label}
      title={label}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8e6e3]/65 group-hover:text-[#e8e6e3]/85 transition">
        {label}
      </div>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-85 group-hover:opacity-100 transition"
    >
      <path
        d="M6.94 6.5A2.19 2.19 0 1 1 2.56 6.5a2.19 2.19 0 0 1 4.38 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 21V10h3v11H4Zm6 0V10h2.9v1.5h.04c.4-.76 1.4-1.56 2.88-1.56 3.08 0 3.65 2.03 3.65 4.66V21h-3v-5.46c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.89V21h-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-85 group-hover:opacity-100 transition"
    >
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.65 0 0 .83-.27 2.72 1.02A9.4 9.4 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.89-1.29 2.72-1.02 2.72-1.02.54 1.38.2 2.4.1 2.65.63.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.93.68 1.88V21c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-85 group-hover:opacity-100 transition"
    >
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 7.5 12 12l5.5-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
