"use client";

import { Footer } from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // hide footer on any /v1 route (prefix)
  const pathname = usePathname();
  const hideFooter = typeof pathname === 'string' && pathname.startsWith('/v1');

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
