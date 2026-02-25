import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import DesktopSidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex">
      <DesktopSidebar />
      <div className="min-h-screen flex flex-col flex-1">
        <header className="h-12.5 px-6 py-4 flex justify-between items-center container">
          <BreadcrumbHeader />
          <div className="flex items-center gap-1">
            <ModeToggle />
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="py-4 flex-1 text-accent-foreground container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
