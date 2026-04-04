'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { FilterGroup, VcsActiveFilters } from '../../types/findings';

type VcsFilterDropdownProps = {
  filterGroups: FilterGroup[];
  activeFilters: VcsActiveFilters;
  onFilterChange: (category: string, optionId: string) => void;
  onClearAll: () => void;
};

export function VcsFilterDropdown({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearAll,
}: VcsFilterDropdownProps) {
  const totalActive = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shrink-0 gap-2 cursor-pointer">
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filter</span>
          {totalActive > 0 && (
            <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {totalActive}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filterGroups.map((group) => {
          const Icon = group.icon;
          return (
            <DropdownMenuSub key={group.category}>
              <DropdownMenuSubTrigger>
                <Icon className="mr-2 size-4" />
                <span className="flex-1">{group.label}</span>
                {activeFilters[group.category]?.length > 0 && (
                  <span className="ml-auto mr-2 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">
                    {activeFilters[group.category].length}
                  </span>
                )}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="min-w-[180px]">
                {group.options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.id}
                    checked={activeFilters[group.category]?.includes(option.id)}
                    onCheckedChange={() =>
                      onFilterChange(group.category, option.id)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          );
        })}
        {totalActive > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel
              className="cursor-pointer text-center text-xs text-destructive hover:text-destructive/80"
              onClick={onClearAll}
            >
              Clear all filters
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
