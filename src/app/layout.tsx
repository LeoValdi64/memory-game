import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#581c87',
};

export const metadata: Metadata = {
  title: "MemoryMaster - Free Online Memory Card Game",
  description: "Test your memory with MemoryMaster! A fun, free online memory card matching game with 3 difficulty levels, beautiful animations, and best score tracking. Play now!",
  keywords: ["memory game", "card game", "matching game", "brain game", "puzzle game", "free game", "online game"],
  authors: [{ name: "MemoryMaster" }],
  creator: "MemoryMaster",
  publisher: "MemoryMaster",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://memory-game.vercel.app",
    siteName: "MemoryMaster",
    title: "MemoryMaster - Free Online Memory Card Game",
    description: "Test your memory with MemoryMaster! A fun, free online memory card matching game with 3 difficulty levels, beautiful animations, and best score tracking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MemoryMaster - Memory Card Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MemoryMaster - Free Online Memory Card Game",
    description: "Test your memory with MemoryMaster! A fun, free memory card matching game.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
