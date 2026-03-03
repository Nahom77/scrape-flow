import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/"); // 🚀 server-side redirect
  }

  return (
    <div className="w-full h-screen mx-auto flex flex-col justify-center items-center gap-3 bg-muted">
      {!session?.user && children}
    </div>
  );
}

export default Layout;
