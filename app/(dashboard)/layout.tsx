import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import DesktopSidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/UserAvatar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  const user = {
    name: "Nahom Tigistu",
    email: "nahom@gmail.com",
  };
  return (
    <div className="h-screen flex">
      <DesktopSidebar />
      <div className="min-h-screen flex flex-col flex-1">
        <header className="h-12.5 px-6 py-4 flex justify-between items-center container">
          <BreadcrumbHeader />
          <div className="flex items-center gap-1">
            <ModeToggle />
            <UserAvatar user={user} />
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
