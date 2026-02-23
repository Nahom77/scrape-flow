"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "./Logo";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

function DesktopSidebar() {
  return (
    <div className="w-full min-w-70 max-w-70 h-screen overflow-hidden hidden md:block relative bg-primary/5 dark:bg-secondary/30 border-r-2 text-muted-foreground dark:text-foreground border-separate">
      <div className="p-4 flex justify-center items-center gap-2 border-b border-separate">
        <Logo />
      </div>
    </div>
  );
}

export default DesktopSidebar;
