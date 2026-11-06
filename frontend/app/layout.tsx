import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SegmentAI Pro | AI Customer Segmentation Platform",
  description: "Advanced AI-powered customer segmentation platform with precision analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-lato antialiased transition-colors duration-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
