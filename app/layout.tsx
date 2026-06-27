import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileContainer } from "@/components/layout/MobileContainer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mood Map | Emotion-based Navigation",
  description: "Discover places based on how you want to feel.",
  icons: {
    icon: [
      {
        url: "/icon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MobileContainer>
          {children}
        </MobileContainer>
      </body>
    </html>
  );
}
