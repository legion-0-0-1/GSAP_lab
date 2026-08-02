"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Faculty_Glyphic, Audiowide } from "next/font/google";
import { TransitionLink } from "@/components/page-transition";

const facultyGlyphic = Faculty_Glyphic({
  subsets: ["latin"],
  weight: "400",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

const links: Record<string, string> = {
  "All Components": "/all",
  Cards: "/all/cards",
  Buttons: "/all/buttons",
  "Text Animations": "/all/text-animations",
};

const Navigation = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = Object.entries(links).filter(([, href]) => href !== pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Floating glass bar — fixed so page overflow / transforms can't kill stickiness */}
      <div className="fixed top-0 inset-x-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 pointer-events-none">
        <header
          className={[
            "pointer-events-auto",
            "flex items-center justify-between gap-4",
            "px-4 py-2.5 sm:px-5 sm:py-3",
            "rounded-2xl",
            "border border-white/10",
            "bg-stone-900/45 backdrop-blur-xl",
            "shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
            "supports-[backdrop-filter]:bg-stone-900/35",
          ].join(" ")}
        >
          <TransitionLink
            href="/"
            className={`text-2xl sm:text-3xl font-bold shrink-0 text-stone-100 ${audiowide.className}`}
          >
            GSAP Lab
          </TransitionLink>

          <nav className="hidden md:flex max-w-fit gap-1 items-center rounded-full border border-white/10 bg-white/10 px-2 py-1.5 backdrop-blur-sm">
            {navLinks.map(([label, href]) => (
              <TransitionLink
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-stone-200 hover:bg-white/10 transition-colors ${facultyGlyphic.className}`}
              >
                {label}
              </TransitionLink>
            ))}
          </nav>

          <a
            className={`hidden md:inline-flex px-5 py-2 bg-blue-500/90 hover:bg-blue-500 text-white rounded-full shrink-0 transition-colors ${facultyGlyphic.className}`}
            href="https://dilpreet-singh.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit My Portfolio
          </a>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/10 text-stone-100 hover:bg-white/15 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-sidebar"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
      </div>
      {/* Spacer matches fixed bar so content isn't tucked underneath */}
      <div className="h-[4.75rem] sm:h-[5.25rem] shrink-0" aria-hidden />

      {/* Mobile sidebar + full-page dim overlay */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[100]",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={[
            "absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        />

        <aside
          id="mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={[
            "absolute right-0 top-0 h-full",
            "w-[min(20rem,85vw)]",
            "flex flex-col",
            "border-l border-white/10",
            "bg-stone-950/90 backdrop-blur-xl",
            "shadow-[-12px_0_40px_rgba(0,0,0,0.45)]",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className={`text-stone-100 text-lg ${audiowide.className}`}>
              Menu
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center size-9 rounded-full border border-white/10 bg-white/10 text-stone-100 hover:bg-white/15 transition-colors"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
            {navLinks.map(([label, href]) => (
              <TransitionLink
                key={href}
                href={href}
                className={`rounded-xl px-4 py-3 text-stone-200 hover:bg-white/10 transition-colors ${facultyGlyphic.className}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </TransitionLink>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <a
              className={`block rounded-full px-4 py-3 text-center bg-blue-500 hover:bg-blue-600 text-white transition-colors ${facultyGlyphic.className}`}
              href="https://dilpreet-singh.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit My Portfolio
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navigation;
