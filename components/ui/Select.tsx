"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";

interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps {
  items: SelectItem[];
  placeholder?: string;
  onChange: (value: string) => void;
}

/**
 * Select component for dropdown selection
 * @param {SelectProps} props - The props for the select component
 * @returns {JSX.Element} A custom select dropdown
 */
export function Select({
  items,
  placeholder = "Select an option",
  onChange,
}: SelectProps) {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    onChange(value);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative">
      <SelectTrigger>
        <div onClick={() => setIsOpen(!isOpen)}>
          <SelectValue>
            {selectedItem
              ? items.find((item) => item.value === selectedItem)?.label
              : placeholder}
          </SelectValue>
        </div>
      </SelectTrigger>
      {isOpen && (
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
      )}
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

  const exampleItems: SelectItem[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  return <Select items={exampleItems} onChange={handleSelectChange} />;
}

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center justify-between p-2 border rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {value.length > 0 ? (
            value.map((v) => (
              <span
                key={v}
                className="bg-gray-200 px-2 py-1 rounded-md text-sm"
              >
                {options.find((opt) => opt.value === v)?.label}
                <button
                  className="ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(v);
                  }}
                >
                  <X size={14} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown size={20} />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value.includes(option.value) ? "bg-gray-200" : ""
              }`}
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
