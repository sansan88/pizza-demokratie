import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '@/app/globals.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Democracy Watch",
  description: "Demokratie ist ein Grundpfeiler unserer Gesellschaft – doch wie viel kostet es eigentlich, eine Initiative oder ein Referendum in der Schweiz zu lancieren? Unser Demokratie-Kostenrechner schafft Transparenz und zeigt, mit welchen Mitteln politische Mitbestimmung erkauft werden kann. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
