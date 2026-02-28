import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center">
      {children}
    </div>
  );
}

export default layout;
