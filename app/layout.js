import { Inter } from "next/font/google";
import "./globals.css";
import { icons } from "lucide-react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ConvexClientProviders from "@/components/providers/ConvexProviders";
import ModalProviders from "@/components/providers/ModalProviders";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgeStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notion Clone",
  description: "The connected workspace",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProviders>
          <EdgeStoreProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          StrorageKey="notion-theme"
        >
          <Toaster position="bottom-center"/>
          <ModalProviders/>
          {children}
        </ThemeProvider>
        </EdgeStoreProvider>

        </ConvexClientProviders>
      </body>
    </html>
  );
}
