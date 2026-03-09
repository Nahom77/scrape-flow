import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full h-screen flex flex-col">
      {children}
      <Separator />
      <footer className="p-2 flex justify-between items-center">
        <Logo iconSize={16} fontSize="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  );
}

export default layout;
