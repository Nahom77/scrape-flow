import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen mx-auto flex flex-col justify-center items-center gap-3 bg-muted">
      {children}
    </div>
  );
}

export default layout;
