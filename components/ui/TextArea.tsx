import { TextareaHTMLAttributes, FC } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
};
