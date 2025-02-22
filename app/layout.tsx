import Header from "@/components/header";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/theme-provider";
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
          className={`${appFont.className} antialiased bg-neutral-950 tracking-wider`}
          suppressHydrationWarning
        >
          <Header />
          <main className="px-24 mt-10">{children}</main>
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
