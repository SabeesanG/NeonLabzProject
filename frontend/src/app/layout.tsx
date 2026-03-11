import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "./globals.css";

export const metadata: Metadata = {
  title: "NeonLabz Products",
  description: "Secure product management dashboard — NestJS + Next.js full-stack assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="dark"
        />
      </body>
    </html>
  );
}
