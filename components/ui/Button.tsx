import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC } from "react";
import { ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  content?: string;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  content,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition";
  const variantStyles = {
    primary: "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500",
    outline:
      "border border-indigo-500 text-indigo-500 bg-white hover:bg-gray-50",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
      {content}
    </button>
  );
};

export default Button;
