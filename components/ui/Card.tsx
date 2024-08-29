import React, { ReactNode } from "react";
// import classNames from "classnames";

// Base Card component
export const Card: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4, ${className}`}>
      {children}
    </div>
  );
};

// Card Header component
export const CardHeader: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={`ml-2 font-bold text-xl text-indigo-600 border-b pb-3 mb-4, ${className}`}
    >
      {children}
    </div>
  );
};

// Card Title component
export const CardTitle: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <h3 className={`text-lg font-bold, ${className}`}>{children}</h3>;
};

// Card Content component
export const CardContent: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`text-gray-700, ${className}`}>{children}</div>;
};
