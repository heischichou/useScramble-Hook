import React from "react";

// utilities
import { cn } from "@/lib/utils";

const Footer = (): React.JSX.Element => (
  // Footer
  <div
    className={cn(
      "w-full px-6 py-7 bg-emerald-800",
      "border-t border-white/25",
    )}
  >
    <div
      className={cn(
        "container flex flex-col sm:flex-row justify-center sm:justify-between",
      )}
    >
      {/* Copyrights */}
      <div
        className={cn(
          "flex flex-col sm:flex-row md:gap-x-1",
          "[&>span]:text-sm [&>span]:lg:text-base",
        )}
      >
        <span>© Jan Michael Garot {new Date().getFullYear()}.</span>
        <span>All Rights Reserved.</span>
      </div>
      {/* End of Copyrights */}

      {/* Slogan */}
      <div className={cn("text-xs md:text-sm", "mt-2 sm:m-0")}>
        Demo built with Next.js. Handmade with love.
      </div>
      {/* End of Slogan */}
    </div>
  </div>
  // End of Footer
);

export default Footer;
