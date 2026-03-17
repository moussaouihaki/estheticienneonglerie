import type { Metadata } from "next";
import { Noto_Serif_Display, Outfit, Josefin_Sans } from "next/font/google";
import "./globals.css";

// "Palma Institut" + PI monogram font — as specified in notes
const notoSerif = Noto_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Body text
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// "Beauty Salon" font — Glacial Indifference style (geometric, clean uppercase)
const josefinSans = Josefin_Sans({
  variable: "--font-caps",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Palma Institut | Beauty Salon & Prothésie Ongulaire",
  description: "Découvrez l'élégance et le savoir-faire de Palma Institut à La Chaux-de-Fonds. Prothésie ongulaire, gel, acrygel et nail art dans une ambiance chaleureuse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${notoSerif.variable} ${outfit.variable} ${josefinSans.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}


