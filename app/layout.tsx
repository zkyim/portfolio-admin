import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/provider/theam-provider";
import { Raleway, Cairo } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Cairo({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', ]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html>
        <body
          className={cn("bg-background",font.className)}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
            <NextSSRPlugin
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
