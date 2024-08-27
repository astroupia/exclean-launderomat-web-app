import { LabelHTMLAttributes, FC } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="text-gray-800 font-semibold" {...props}>
      {children}
    </label>
  );
};
