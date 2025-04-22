
import React from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SearchableFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onToggle: (value: string) => void;
}

const SearchableFilter: React.FC<SearchableFilterProps> = ({
  title,
  options,
  selectedOptions,
  onToggle,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-foreground/80 mb-2 block">{title}</label>
      <Command className="rounded-lg border border-glass-border shadow-glass bg-white/40">
        <CommandInput placeholder={`Search ${title.toLowerCase()}...`} className="neo-input" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <div className="flex flex-wrap gap-2 p-2">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => onToggle(option)}
                  className={cn(
                    "glass-pill micro-hover",
                    selectedOptions.includes(option) ? "active" : ""
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchableFilter;
