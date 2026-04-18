import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'AI Disease Progression Predictor',
  description: 'Hospital management powered by AI - Predict patient health progression with advanced AI technology',
  keywords: ['AI', 'health', 'disease prediction', 'medical', 'hospital management'],
  authors: [{ name: 'AI Disease Predictor Team' }],
  creator: 'AI Disease Predictor',
  publisher: 'AI Disease Predictor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'AI Disease Progression Predictor',
    description: 'Hospital management powered by AI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Disease Progression Predictor',
    description: 'Hospital management powered by AI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0EB2B1' },
    { media: '(prefers-color-scheme: dark)', color: '#04012E' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased bg-main-1 hoverEffect font-poppins`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}