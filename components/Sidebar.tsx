"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

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
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href),
    ) || routes[0];

  console.log(pathname);
  return (
    <div className="w-full min-w-70 max-w-70 h-screen overflow-hidden hidden md:block relative bg-primary/5 dark:bg-secondary/30 border-r-2 text-muted-foreground dark:text-foreground border-separate">
      <div className="p-4 flex justify-center items-center gap-2 border-b border-separate">
        <Logo />
      </div>

      <div className="p-2">TODO CREDITS</div>

      <div className="p-2 flex flex-col gap-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href),
    ) || routes[0];

  return (
    <div className="md:hidden block bg-background border-separate">
      <nav className="px-8 flex justify-between items-center container">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 sm:w-135 p-3 space-y-4" side={"left"}>
            <SheetHeader className="p-0">
              <Logo />
              <SheetTitle className="hidden">MobileSidebar</SheetTitle>
              <SheetDescription className="hidden">
                MobileSidebar
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen((prev) => !prev)}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
