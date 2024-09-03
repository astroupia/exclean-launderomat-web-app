import React, { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  // Add any additional props here
}

/**
 * Label component for form inputs
 * @param {LabelProps} props - The props for the label
 * @returns {JSX.Element} A styled label element
 */
export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="text-gray-800 font-semibold" {...props}>
      {children}
    </label>
  );
};
