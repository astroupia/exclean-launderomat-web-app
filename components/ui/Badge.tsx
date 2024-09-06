import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "In Progress"
    | "success"
    | "warning"
    | "info"
    | "destructive"
    | "Pending"
    | "Completed";
}

/**
 * Badge component for displaying short status text
 * @param {BadgeProps} props - The props for the badge
 * @returns {JSX.Element} A styled badge element
 */
export const Badge: React.FC<BadgeProps> = ({ children, variant = "info" }) => {
  const badgeStyles: Record<string, string> = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
    destructive: "bg-red-500 text-white",
    "In Progress": "bg-blue-300 text-white",
    Pending: "bg-orange-300 text-white",
    Completed: "bg-green-300 text-white",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${badgeStyles[variant]}`}
    >
      {children}
    </span>
  );
};
