"use client";

import { useState } from "react";

interface SelectProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
}

// Example items array
const exampleItems = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

export function Select({
  items,
  placeholder = "Select an option",
  onChange,
}: SelectProps) {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    onChange(value);
  };

  return (
    <div className="relative">
      <SelectTrigger>
        <SelectValue>
          {selectedItem
            ? items.find((item) => item.value === selectedItem)?.label
            : placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            onClick={() => handleSelect(item.value)}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </div>
  );
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-600">
      {children}
    </div>
  );
}

export function SelectValue({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md border border-indigo-500 z-10">
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  onClick,
  children,
}: {
  value: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-indigo-500 hover:text-white"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Example usage of the Select component
export default function ExamplePage() {
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return <Select items={exampleItems} onChange={handleSelectChange} />;
}
