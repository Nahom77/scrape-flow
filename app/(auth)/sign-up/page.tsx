import React from "react";
import { SignupForm } from "../_components/Signup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

function page() {
  return (
    <div className="w-full flex justify-center gap-3">
      <SignupForm />
    </div>
  );
}

export default page;
