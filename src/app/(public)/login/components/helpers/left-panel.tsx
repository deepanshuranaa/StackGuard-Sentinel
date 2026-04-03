'use client';

import React from 'react';
import Image from 'next/image';

/**
 * LeftPanel - Dark branded side of login page
 * Full-screen hero image with branding overlay
 * Responsive across all screen sizes
 */
export function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 bg-purple-950 relative overflow-hidden min-h-screen md:min-h-auto">
      {/* Background Hero Image - Full Coverage */}
      <Image
        src="/stackguard-hero.png"
        alt="StackGuard Security Platform"
        fill
        className="object-cover absolute inset-0"
        priority
      />
    </div>
  );
}
