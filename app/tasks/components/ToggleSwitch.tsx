// components/ui/toggle-switch.tsx
"use client";

import * as React from "react";

interface ToggleSwitchProps<T extends string> {
  options: readonly ToggleOption<T>[];
  value: T;
  setToggle: (value: T) => void;
  className?: string;
}

type ToggleOption<T extends string> = {
  value: T;
  label: string;
  color?: string;
};

export function ToggleSwitch<T extends string>({
  options,
  value,
  setToggle,
  className = ""
}: ToggleSwitchProps<T>) {
  const optionCount = options.length;
  const optionWidth = 100 / optionCount;
  const activeIndex = options.findIndex(opt => opt.value === value);

  return (
    <div className={`rounded-sm  ${className}`}>
      <div className="relative flex h-9 items-center rounded-sm bg-gray-200/50">
        {/* Sliding indicator */}
        <div
          className={`
            absolute h-full rounded-sm
            transition-all duration-350 ease-[cubic-bezier(0.65,0,0.35,1)]
            ${options[activeIndex]?.color || 'bg-gray-600'}
          `}
          style={{
            width: `${optionWidth}%`,
            left: `${activeIndex * optionWidth}%`
          }}
        />

        {/* Options */}
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setToggle(option.value)}
            className={`
              flex-1 text-sm text-center leading-10 cursor-pointer z-10 transition-colors
              ${value === option.value ? 'text-white font-medium' : 'text-gray-600'}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
