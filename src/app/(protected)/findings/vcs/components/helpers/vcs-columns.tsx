'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { VcsSecretFinding } from '../../types/findings';
import { Checkbox } from '@/components/ui/checkbox';
import { SeverityBadge } from '../helpers/severity-badge';
import { DetectorBadge } from '../helpers/detector-badge';
import { GitProviderIcon } from '../helpers/git-provider-icon';
import { StatusBadges } from '../helpers/status-badges';
import { SecretCell } from '../helpers/secret-cell';
import { ArrowUpRight } from 'lucide-react';

export const vcsColumns: ColumnDef<VcsSecretFinding>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: 'severity',
    header: () => <span className="block text-center">Severity</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <SeverityBadge severity={row.getValue('severity')} />
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: 'detectorType',
    header: () => <span className="block text-center">Detector Type</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DetectorBadge detectorType={row.getValue('detectorType')} />
      </div>
    ),
    size: 140,
  },
  {
    accessorKey: 'gitProvider',
    header: () => <span className="block text-center">Git Provider</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <GitProviderIcon provider={row.getValue('gitProvider')} />
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: 'secretMask',
    header: () => <span className="block text-center">Secret</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <SecretCell secret={row.original.secret} />
      </div>
    ),
    enableSorting: false,
    size: 160,
  },
  {
    accessorKey: 'occurrences',
    header: () => <span className="block text-center">Occurrences</span>,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="tabular-nums font-medium">{row.getValue<number>('occurrences')}</span>
      </div>
    ),
    size: 110,
  },
  {
    accessorKey: 'blastRadius',
    header: () => <span className="block text-center">Blast Radius</span>,
    cell: () => (
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
          Insights
          <ArrowUpRight className="h-3.5 w-3.5 rotate-0" />
        </span>
      </div>
    ),
    size: 110,
  },
  {
    accessorKey: 'status',
    header: () => <span className="block text-center">Status</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <StatusBadges actions={row.original.actions ?? []} />
      </div>
    ),
    size: 200,
  },
];
