import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { AuthProvider } from "@/hooks/use-auth";
import { CommandPalette } from "@/components/layout/command-palette";
import { Footer } from "@/components/layout/footer";


/**
 * Barlow — Body font: clean, readable, versatile.
 * Used for paragraphs, labels, and general UI text.
 */
const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * Barlow Condensed — Heading font: condensed, impactful, sports-oriented.
 * Used for h1-h6, hero text, section titles.
 */
const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** SEO metadata for the entire application */
export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Le futur du football dans le Multivers`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "football",
    "club management",
    "gestion sportive",
    "live score",
    "analytics",
    "fan zone",
    "billetterie",
    "next-gen",
  ],
  authors: [{ name: APP_NAME }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: APP_NAME,
    title: `${APP_NAME} — Plateforme de Gestion de Club de Football`,
    description: APP_DESCRIPTION,
  },
};

/** Viewport configuration for mobile-first responsive design */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
};

/**
 * RootLayout — The top-level layout wrapping the entire application.
 *
 * Architecture decisions:
 * - Dark mode enforced via class="dark" on <html> (no light mode toggle for v1)
 * - Fonts loaded via next/font for zero layout shift
 * - FloatingNavbar rendered at root level (always visible)
 * - Main content has top padding to account for fixed navbar
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${barlow.variable} ${barlowCondensed.variable} dark`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <AuthProvider>
          {/* Global Search & Command Menu */}
          <CommandPalette />

          {/* Floating navigation — fixed at top with glassmorphism */}
          <FloatingNavbar />

          {/* Main content area — padded for the floating navbar */}
          <main className="pt-24">{children}</main>

          {/* Modern Footer Component */}
          <Footer />


          {/* Subtle ambient gradient at bottom for depth */}
          <div
            className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 100%)",
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
