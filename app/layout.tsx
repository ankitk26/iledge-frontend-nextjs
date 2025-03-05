import Header from "@/components/header";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const appFont = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iledge",
  description: "Personal expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableColorScheme
        disableTransitionOnChange
      >
        <body
          className={`${appFont.className} bg-neutral-950 tracking-wider antialiased`}
          suppressHydrationWarning
        >
          <Header />
          <main className="mt-10 px-8 lg:px-24">{children}</main>
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
