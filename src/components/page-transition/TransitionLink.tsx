"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { usePageTransition } from "./PageTransitionProvider";

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink({
  href,
  onClick,
  replace,
  ...props
}: TransitionLinkProps) {
  const { navigate, phase } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (replace) return; // fall back to default Link behavior for replace

    const url = typeof href === "string" ? href : href.pathname ?? "";
    if (!url || url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("tel:")) {
      return;
    }

    e.preventDefault();
    if (phase !== "idle") return;
    navigate(url);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
