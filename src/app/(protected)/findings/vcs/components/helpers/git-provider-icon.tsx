'use client';

import Image from 'next/image';

const providerMeta: Record<string, { label: string; iconPath: string }> = {
  github: { label: 'GitHub', iconPath: '/assets/icons/github.svg' },
  gitlab: { label: 'GitLab', iconPath: '/assets/icons/gitlab.svg' },
  bitbucket: { label: 'Bitbucket', iconPath: '/assets/icons/github.svg' },
};

type GitProviderIconProps = {
  provider: 'github' | 'gitlab' | 'bitbucket';
};

export function GitProviderIcon({ provider }: GitProviderIconProps) {
  const meta = providerMeta[provider];

  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <Image
        src={meta.iconPath}
        alt={meta.label}
        width={16}
        height={16}
        className="dark:invert"
      />
      <span>{meta.label}</span>
    </span>
  );
}
