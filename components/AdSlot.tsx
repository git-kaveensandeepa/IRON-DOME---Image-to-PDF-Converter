'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  slotType?: 'horizontal' | 'rectangle';
  className?: string;
  slotId?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotType = 'horizontal',
  className = '',
  slotId = '1234567890',
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error window.adsbygoogle is injected by google adsense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ad blocker or script not loaded
    }
  }, []);

  return (
    <aside
      aria-label="Sponsored"
      className={`relative mx-auto my-4 flex items-center justify-center overflow-hidden rounded-xl ${
        slotType === 'horizontal'
          ? 'w-full max-w-4xl min-h-[90px]'
          : 'w-full max-w-sm min-h-[250px]'
      } ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: slotType === 'horizontal' ? '90px' : '250px',
        }}
        data-ad-client="ca-pub-9123847291837462"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};
