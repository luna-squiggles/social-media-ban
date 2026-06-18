import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Under 16 Social Media Ban",
  description:
    "Answering your questions on the UK under-16 social media ban.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${playfair.variable} h-full antialiased`}>
      <body
        className="min-h-full font-sans text-black"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
