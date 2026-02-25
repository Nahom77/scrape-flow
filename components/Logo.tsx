import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  fontSize?: string;
  iconSize?: number;
}

function Logo({ fontSize = "text-2xl", iconSize = 20 }: Props) {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex items-center gap-2 font-extrabold text-2xl",
        fontSize,
      )}
    >
      <div className="p-2 bg-linear-to-r from-emerald-500 to-emerald-600 rounded-xl">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-clip-text bg-linear-to-r from-emerald-500 to-emerald-600 text-transparent">
          Flow
        </span>
        <span className="text-stone-700 dark:text-stone-300">Scrape</span>
      </div>
    </Link>
  );
}

export default Logo;
