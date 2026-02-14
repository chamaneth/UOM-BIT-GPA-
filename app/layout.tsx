import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import MainLayout from "@/layout/main";
import GoogleAnalytics from "@/components/custom/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UOM BIT GPA Calculator",
  description: "Calculate your GPA for University of Moratuwa BIT program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // Disable automatic page_view so we can control SPA pageviews
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
            <GoogleAnalytics gaId={GA_ID} />
          </>
        )}
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
