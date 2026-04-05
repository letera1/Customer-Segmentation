import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Segmentation Platform",
  description: "Advanced customer segmentation and analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-dark">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
