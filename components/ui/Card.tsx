import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card component for containing content
 * @param {CardProps} props - The props for the card
 * @returns {JSX.Element} A styled card container
 */
export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

/**
 * CardHeader component for card titles
 * @param {CardProps} props - The props for the card header
 * @returns {JSX.Element} A styled card header
 */
export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`ml-2 font-bold text-xl text-indigo-600 border-b pb-3 mb-4 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

/**
 * CardTitle component for card titles
 * @param {CardProps} props - The props for the card title
 * @returns {JSX.Element} A styled card title
 */
export const CardTitle: React.FC<CardProps> = ({ children, className }) => {
  return <h3 className={`text-lg font-bold ${className || ""}`}>{children}</h3>;
};

/**
 * CardContent component for card content
 * @param {CardProps} props - The props for the card content
 * @returns {JSX.Element} A styled card content container
 */
export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`text-gray-700 ${className || ""}`}>{children}</div>;
};
