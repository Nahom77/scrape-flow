import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const user = useAppStore((s) => s.user);

  // useEffect(() => {
  //   if (user) {
  //     router.push("/");
  //   }
  // });

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

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
