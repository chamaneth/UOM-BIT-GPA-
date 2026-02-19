export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_ID, { page_path: url });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
