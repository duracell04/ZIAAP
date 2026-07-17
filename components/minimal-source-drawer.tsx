"use client";

import { useEffect, useRef } from "react";
import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MinimalDemoSource } from "@/lib/minimal-demo";

type MinimalSourceDrawerProps = {
  sources: MinimalDemoSource[];
  onClose: () => void;
};

export function MinimalSourceDrawer({ sources, onClose }: MinimalSourceDrawerProps) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    return () => previousFocus?.focus();
  }, []);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="minimal-drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside
        aria-labelledby="source-drawer-title"
        aria-modal="true"
        className="minimal-source-drawer"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Source record</span>
            <h2 id="source-drawer-title">What supports this item?</h2>
          </div>
          <Button aria-label="Close source drawer" variant="ghost" onClick={onClose}>
            <X size={16} />
          </Button>
        </header>
        <div className="minimal-source-list">
          {sources.map((source) => (
            <article key={source.id}>
              <BookOpen size={17} />
              <div>
                <span>{source.kind}</span>
                <h3>{source.title}</h3>
                <p>{source.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="minimal-drawer-note">
          Curated synthetic source excerpts for this demonstration. They are not uploaded documents or verified evidence.
        </p>
      </aside>
    </div>
  );
}
