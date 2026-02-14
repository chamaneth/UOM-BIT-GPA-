"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({
  gaId,
}: {
  gaId?: string | undefined;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;
    if (typeof window === "undefined") return;
    if (!window.gtag) return;

    // send a page_view on route change
    window.gtag("config", gaId, { page_path: pathname });
  }, [gaId, pathname]);

  return null;
}
