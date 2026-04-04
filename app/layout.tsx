import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import CustomPathname from "./../hooks/usePathname";
import { routes } from "@/components/Sidebar";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function GenerateMetadata(): Promise<Metadata> {
  const pathname = CustomPathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 1 && pathname.includes(route.href),
    ) || routes[0];
  console.log(pathname);

  return {
    title: "activeRoute.label",
    description: "Edit Workflow",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} antialiased`}>
        <AppProviders>
          {children}
          <Toaster richColors />
        </AppProviders>
      </body>
    </html>
  );
}
