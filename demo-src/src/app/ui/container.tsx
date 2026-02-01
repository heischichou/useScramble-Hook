"use client";

import type { ReactNode, JSX } from "react";

// utilities
import { cn } from "@/lib/utils";

export default function Container({
  id = "",
  rootClassName = "py-28",
  className = "",
  children,
}: Readonly<{
  id?: string;
  rootClassName?: string;
  className?: string;
  children: ReactNode;
}>): JSX.Element {
  return (
    // Reusable Container Wrapper
    <section
      // set id attribute
      {...(id ? { id } : null)}
      className={cn(rootClassName, "px-6")}
    >
      {/* Reusable Container */}
      <div className={cn(className, "container")}>{children}</div>
    </section>
    // End of Reusable Container Wrapper
  );
}
