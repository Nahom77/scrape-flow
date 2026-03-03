import BreadcrumbHeader from "@/components/BreadcrumbHeader";
import DesktopSidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/UserAvatar";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/sign-in"); // 🚀 server-side redirect
  }

  return (
    session?.user && (
      <div className="h-screen flex">
        <DesktopSidebar />
        <div className="min-h-screen flex flex-col flex-1">
          <header className="h-12.5 px-6 py-4 flex justify-between items-center container">
            <BreadcrumbHeader />
            <div className="flex items-center gap-1">
              <ModeToggle />
              <UserAvatar user={session?.user} />
            </div>
          </header>
          <Separator />
          <div className="overflow-auto">
            <div className="p-4 flex-1 text-accent-foreground container">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Layout;
