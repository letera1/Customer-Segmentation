import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Segmentation Dashboard",
  description: "AI-powered customer segmentation for targeted marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
