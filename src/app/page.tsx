// src/app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Audiowide, Faculty_Glyphic } from "next/font/google";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import DemoCard from "@/components/DemoCard";
import { TransitionLink } from "@/components/page-transition";
import { allMeta, allComponents } from "@/gsap-components";

const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });
const facultyGlyphic = Faculty_Glyphic({ subsets: ["latin"], weight: "400" });

const FEATURED_IDS = ["hover-slots-text", "ripple-button", "tilt-card"];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const featured = FEATURED_IDS.map((id) => allMeta.find((m) => m.id === id)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  );

  const HeroDemo = allComponents["hover-slots-text"];

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-brand", { y: 28, opacity: 0, duration: 0.75 })
        .from(".hero-copy", { y: 18, opacity: 0, duration: 0.55 }, "-=0.4")
        .from(".hero-cta", { y: 14, opacity: 0, duration: 0.45 }, "-=0.3")
        .from(".hero-stage", { opacity: 0, y: 20, duration: 0.7 }, "-=0.25");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-stone-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16)_0%,transparent_68%)] blur-2xl" />
        <div className="absolute top-[45%] -left-28 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(168,162,158,0.1)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(28,25,23,0.95)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 50% 30%, black 15%, transparent 70%)",
          }}
        />
      </div>

      <Navigation />

      <main className="relative">
        <section
          ref={heroRef}
          className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-20 sm:pb-28 max-w-6xl mx-auto w-full"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1
              className={`hero-brand text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-stone-50 ${audiowide.className}`}
            >
              GSAP Lab
            </h1>
            <p
              className={`hero-copy mt-5 sm:mt-6 max-w-xl text-stone-400 text-base sm:text-lg leading-relaxed ${facultyGlyphic.className}`}
            >
              Motion experiments and interactive UI patterns — built to study, steal from, and
              ship.
            </p>
            <TransitionLink
              href="/all"
              className={`hero-cta mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-stone-100 backdrop-blur-md hover:bg-white/15 transition-colors ${facultyGlyphic.className}`}
            >
              Explore components <ArrowRight size={16} />
            </TransitionLink>
          </div>

          <div className="hero-stage mt-14 sm:mt-20 flex justify-center">
            <div className="relative w-full max-w-xl min-h-[140px] flex items-center justify-center">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_65%)]" />
              <div className="relative">{HeroDemo ? <HeroDemo /> : null}</div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 max-w-6xl mx-auto w-full">
          <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2
                className={`text-stone-100 text-lg sm:text-xl font-medium ${facultyGlyphic.className}`}
              >
                Featured
              </h2>
              <p className={`mt-1 text-stone-500 text-sm ${facultyGlyphic.className}`}>
                A quick cross-section of text, buttons, and cards.
              </p>
            </div>
            <TransitionLink
              href="/all"
              className={`text-stone-500 hover:text-stone-200 text-sm transition-colors flex items-center gap-1 shrink-0 ${facultyGlyphic.className}`}
            >
              View all <ArrowRight size={14} />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featured.map((entry) => {
              const Component = allComponents[entry.id];
              return (
                <DemoCard key={entry.id} entry={entry}>
                  <Component />
                </DemoCard>
              );
            })}
          </div>
        </section>
      </main>

      <footer
        className={`relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-white/5 text-center text-stone-600 text-xs ${facultyGlyphic.className}`}
      >
        Built by Dilpreet Singh — a running collection, updated as new patterns get built.
      </footer>
    </div>
  );
}
