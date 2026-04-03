'use client';

import React from 'react';

/**
 * LeftPanel - Dark branded side of login page
 * Contains logo, tagline, and product information
 */
export function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 px-8 py-12">
      {/* Logo Container */}
      <div className="mb-12">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Company Name */}
      <h1 className="text-4xl font-bold text-white text-center mb-6">
        StackGuard
      </h1>

      {/* Tagline */}
      <p className="text-xl text-purple-200 text-center max-w-sm leading-relaxed">
        Remediation First Platform for Non-Human Identities
      </p>

      {/* Decorative Elements */}
      <div className="mt-20 grid grid-cols-3 gap-8">
        {[
          { icon: '🔍', label: 'DETECT' },
          { icon: '⚙️', label: 'GOVERN' },
          { icon: '🛡️', label: 'REMEDIATE' },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="text-xs font-semibold text-purple-300">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom Badge */}
      <div className="mt-auto pt-12 text-center">
        <p className="text-purple-300 text-sm">
          The Remediation-First Platform
        </p>
      </div>
    </div>
  );
}
