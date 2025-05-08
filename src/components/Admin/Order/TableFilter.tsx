"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  key: string;
  label: string;
}

interface TableFilterProps {
  options: FilterOption[];
  onFilter: (field: string, value: string) => void;
  onClear?: () => void;
}

export function TableFilter({ options, onFilter, onClear }: TableFilterProps) {
  const [selectedField, setSelectedField] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilter = () => {
    if (selectedField && filterValue) {
      onFilter(selectedField, filterValue);
    }
  };

  const handleClear = () => {
    setSelectedField("");
    setFilterValue("");
    if (onClear) onClear();
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 w-full">
      <Select value={selectedField} onValueChange={setSelectedField}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Chọn trường lọc" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex-1 min-w-[200px]">
        <Input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Nhập giá trị lọc..."
        />
      </div>

      <Button
        onClick={handleFilter}
        variant="default"
        className="flex items-center gap-1"
      >
        <Search className="h-4 w-4" />
        Lọc
      </Button>

      <Button
        onClick={handleClear}
        variant="outline"
        className="flex items-center gap-1"
      >
        <X className="h-4 w-4" />
        Xóa lọc
      </Button>
    </div>
  );
}
