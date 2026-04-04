'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';

type SortOption = {
  value: string;
  label: string;
};

type SortSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
};

export function SortSelect({ value, onChange, options }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto cursor-pointer">
        <div className="flex items-center gap-2">
          <ArrowDownUp className="size-4" />
          <span className="text-sm">Sort data by</span>
        </div>
        <SelectValue className="hidden" />
      </SelectTrigger>
      <SelectContent align="end">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
