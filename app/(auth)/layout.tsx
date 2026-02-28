import Logo from "@/components/Logo";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen mx-auto flex flex-col justify-center items-center gap-3 bg-muted">
      <Logo />
      {children}
    </div>
  );
}

export default layout;
