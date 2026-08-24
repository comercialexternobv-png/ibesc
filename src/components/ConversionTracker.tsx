'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function conversionName(link: HTMLAnchorElement) {
  if (link.dataset.conversion) return link.dataset.conversion;
  if (link.href.includes('wa.me')) return 'whatsapp';
  if (link.href.includes('uninassau')) return 'parceiro-uninassau';
  if (link.href.includes('unifael')) return 'parceiro-unifael';
  if (link.href.includes('share.google')) return 'google-localizacao';
  return null;
}

export default function ConversionTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest('a') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      const name = conversionName(target);
      if (!name) return;

      const detail = { event: 'ibesc_conversion', conversion_name: name, link_url: target.href };
      window.dataLayer?.push(detail);
      window.gtag?.('event', 'conversion', { event_category: 'engagement', event_label: name });
      window.dispatchEvent(new CustomEvent('ibesc:conversion', { detail }));
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
