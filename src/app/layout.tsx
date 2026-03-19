import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

// Heading font
const montserrat = Montserrat({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Body text
const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

// For specific geometric / caps elements
const montserratCaps = Montserrat({
  variable: "--font-caps",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Palma Institut | Beauty Salon & Prothésie Ongulaire",
  description: "Découvrez l'élégance et le savoir-faire de Palma Institut à La Chaux-de-Fonds. Prothésie ongulaire, gel, acrygel et nail art dans une ambiance chaleureuse.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${lato.variable} ${montserratCaps.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}


