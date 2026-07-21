"use client";

import { useEffect } from "react";

/* Anchor links can land on the wrong section: the browser scrolls to the
   target early, then images above it load and shift the layout. Re-align
   to the hash target once things settle — unless the user has started
   scrolling themselves. */
export function HashRescroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    const realign = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView();
    };

    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);

    const t1 = window.setTimeout(realign, 350);
    const t2 = window.setTimeout(realign, 1200);
    window.addEventListener("load", realign);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", realign);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, []);

  return null;
}
