import { cn } from "../../lib/utils";
import React from "react";

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-neutral-50 dark:bg-[#0F0F0F] transition-colors duration-300">
      <div
        className={cn(
          "absolute inset-0 opacity-40 dark:opacity-60",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#a1a1aa_2px,transparent_2px),linear-gradient(to_bottom,#a1a1aa_2px,transparent_2px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_2px,transparent_2px),linear-gradient(to_bottom,#262626_2px,transparent_2px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#0F0F0F]"></div>
    </div>
  );
};