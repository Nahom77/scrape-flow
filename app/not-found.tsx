import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <div className="min-h-screen p-4 flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-primary text-6xl">404</h1>
        <h2 className="mb-4 font-semibold text-2xl">Page Not Found</h2>
        <p className="max-w-md mb-8 text-muted-foreground">
          Don&apos;t worry, even the best data sometimes gets lost in the
          internet
        </p>
        <div className="flex sm:flex-row flex-col justify-center gap-4">
          <Link
            href={"/"}
            className="px-4 py-2 flex justify-center items-center bg-primary hover:bg-primary/80 rounded-md text-white transition-colors"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-muted-foreground text-sm text-center">
        If you believe this is an error, please contact our support team
      </footer>
    </div>
  );
}

export default NotFoundPage;
