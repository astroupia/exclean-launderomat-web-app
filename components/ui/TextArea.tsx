import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Add any additional props here
}

/**
 * TextArea component for multi-line text input
 * @param {TextareaProps} props - The props for the textarea
 * @returns {JSX.Element} A styled textarea element
 */
export const TextArea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        className || ""
      }`}
      {...props}
    />
  );
};
