'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Search, X } from 'lucide-react';
import type { VcsActiveFilters, VcsFilterCategory } from '../../types/findings';
import type { FilterGroup } from '../../types/findings';

type TableToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: VcsActiveFilters;
  filterGroups: FilterGroup[];
  onRemoveFilter: (category: VcsFilterCategory, optionId: string) => void;
  onDownload: () => void;
  selectedCount: number;
};

export function TableToolbar({
  searchQuery,
  onSearchChange,
  activeFilters,
  filterGroups,
  onRemoveFilter,
  onDownload,
  selectedCount,
}: TableToolbarProps) {
  // Build a flat list of active filter chips
  const chips: { category: VcsFilterCategory; optionId: string; label: string; groupLabel: string }[] = [];
  for (const group of filterGroups) {
    const selected = activeFilters[group.category] ?? [];
    for (const optionId of selected) {
      const option = group.options.find((o) => o.id === optionId);
      if (option) {
        chips.push({
          category: group.category,
          optionId,
          label: option.label,
          groupLabel: group.label,
        });
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search findings..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-9"
          />
        </div>

        {/* Right side: selected count + download */}
        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
          )}
          <Button variant="outline" size="sm" onClick={onDownload} className="cursor-pointer gap-1.5">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={`${chip.category}-${chip.optionId}`}
              className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {chip.label}
              <button
                type="button"
                onClick={() => onRemoveFilter(chip.category, chip.optionId)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
