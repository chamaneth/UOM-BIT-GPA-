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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uom-bit-gpa-y.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "UOM BIT GPA Calculator",
  description: "Calculate your GPA for University of Moratuwa BIT program",
  keywords: ["UOM", "BIT", "GPA Calculator", "University of Moratuwa", "GPA", "CGPA"],
  authors: [{ name: "UOM BIT Team" }],
  openGraph: {
    title: "UOM BIT GPA Calculator",
    description: "Calculate your GPA for University of Moratuwa BIT program",
    url: siteUrl,
    siteName: "UOM BIT GPA Calculator",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UOM BIT GPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UOM BIT GPA Calculator",
    description: "Calculate your GPA for University of Moratuwa BIT program",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
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
