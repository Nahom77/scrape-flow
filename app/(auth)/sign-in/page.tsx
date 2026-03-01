import React from "react";
import { SigninForm } from "../_components/Signin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
};

function page() {
  return (
    <div className="w-full flex justify-center">
      <SigninForm />
    </div>
  );
}

export default page;
