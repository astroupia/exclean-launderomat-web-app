import { FC } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "info";
}

export const Badge: FC<BadgeProps> = ({ children, variant = "info" }) => {
  const badgeStyles = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${badgeStyles[variant]}`}
    >
      {children}
    </span>
  );
};
