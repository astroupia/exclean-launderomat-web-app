import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props here
}

/**
 * Input component for single-line text input
 * @param {InputProps} props - The props for the input
 * @returns {JSX.Element} A styled input element
 */
export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        className || ""
      }`}
      {...props}
    />
  );
};
