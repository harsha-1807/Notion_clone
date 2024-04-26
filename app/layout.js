import { Inter } from "next/font/google";
import "./globals.css";
import { icons } from "lucide-react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ConvexClientProviders from "@/components/providers/ConvexProviders";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          StrorageKey="notion-theme"
        >
          {children}
        </ThemeProvider>
        </ConvexClientProviders>
      </body>
    </html>
  );
}
