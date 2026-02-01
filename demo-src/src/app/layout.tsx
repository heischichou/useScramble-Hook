// types
import type { Metadata } from "next";

// styles
import "./globals.css";

// fonts
import { Space_Grotesk } from "next/font/google";

const SpaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

const MainFont: string = SpaceGrotesk.className;

export const metadata: Metadata = {
  title: "Use Scamble Hook Demo",
  description: "A reusable React hook that scrambles a text string by incrementally progressing through a collection of frames.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${MainFont} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
