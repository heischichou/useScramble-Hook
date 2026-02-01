"use client";

import { useRef } from "react";

// utilities
import { motion, useInView } from "framer-motion";
import useScramble from "../hooks/use-scramble";
import { cn } from "@/lib/utils";

// components
import { Schibsted_Grotesk } from "next/font/google";

const SchibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const PairingFont: string = SchibstedGrotesk.className;

const desccription: string = `On the other hand, we denounce with righteous indignation and dislike
  men who are so beguiled and demoralized by the charms of pleasure of the
  moment, so blinded by desire, that they cannot foresee the pain and
  trouble that are bound to ensue; and equal blame belongs to those who
  fail in their duty through weakness of will, which is the same as saying
  through shrinking from toil and pain. These cases are perfectly simple
  and easy to distinguish.`;

export default function DemoSection({
  header,
  duration,
  maintainWidth = true,
}: Readonly<{
  header: string;
  duration: number;
  maintainWidth?: boolean;
}>) {
  // section ref
  const ref = useRef<HTMLDivElement>(null);

  // watch for when section enters into view
  const isInView = useInView(ref, { once: true, margin: "0px 0px -400px 0px" });

  // use scramble hook configuration
  const { text } = useScramble(desccription, isInView, duration, maintainWidth);

  return (
    // Demo Section
    <section
      className="grid grid-cols-3 lg:grid-cols-6 lg:gap-x-20 gap-y-4 lg:gap-y-0"
      ref={ref}
    >
      {/* Section Header */}
      <div
        className={cn(
          "col-span-3 font-bold text-emerald-500",
          "text-3xl sm:text-4xl lg:text-5xl",
          PairingFont,
        )}
      >
        {header}
      </div>
      {/* End of Section Header */}

      {/* Scrambled Demo Description */}
      <motion.div
        className="col-span-3 text-base sm:text-lg"
        initial={{ y: 25, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 100 } : { y: 25, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.div>
      {/* End of Scrambled Demo Description */}
    </section>
    // Demo Section
  );
}
