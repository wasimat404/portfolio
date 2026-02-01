"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "./SmoothScroll";
import MenuOverlay from "./MenuOverlay";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // ESC to close + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <SmoothScroll>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-xs uppercase tracking-[0.35em] opacity-80">
              Wasim.
            </span>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-xs uppercase tracking-[0.35em] opacity-80 hover:opacity-100 transition outline-none"
            >
              Cloud
            </button>
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="pt-24">{children}</main>

      {/* Menu Overlay */}
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </SmoothScroll>
  );
}
