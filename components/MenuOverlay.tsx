"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function MenuOverlay({ open, onClose }: Props) {
  const go =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClose();

      // wait for menu close animation
      window.setTimeout(() => {
        if (href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 250);
    };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          {/* click background to close */}
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
          />

          <motion.div
            className="relative mx-auto max-w-7xl px-6 pt-24 md:pt-32"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-6">
              <div className="text-[10px] uppercase tracking-[0.45em] opacity-60">
                Navigation
              </div>

              <button
                onClick={onClose}
                className="text-[10px] uppercase tracking-[0.45em] opacity-60 hover:opacity-100 transition"
              >
                Close
              </button>
            </div>

            {/* Links */}
            <nav className="mt-24 space-y-10">
              {[
                { label: "Home", href: "#" },
                { label: "Selected Work", href: "#work" },
                { label: "About", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={go(item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.6,
                    ease,
                  }}
                  className="block text-5xl md:text-7xl font-light uppercase tracking-tight hover:opacity-60 transition"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-24 border-t border-white/10 pt-8 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.45em] opacity-60">
                Wasim · Portfolio
              </div>
              <div className="text-[10px] uppercase tracking-[0.45em] opacity-60">
                © {new Date().getFullYear()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
