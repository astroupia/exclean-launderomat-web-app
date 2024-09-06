import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps extends TableProps {
  content?: string;
}

/**
 * Table component for displaying tabular data
 * @param {TableProps} props - The props for the table
 * @returns {JSX.Element} A styled table element
 */
export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full divide-y divide-gray-200 ${className || ""}`}
      >
        {children}
      </table>
    </div>
  );
};

/**
 * TableHeader component for table headers
 * @param {TableHeaderProps} props - The props for the table header
 * @returns {JSX.Element} A styled table header
 */
export const TableHeader: React.FC<TableHeaderProps> = ({
  content,
  children,
  className,
}) => {
  return (
    <thead className={`text-indigo-600 bg-gray-100 ${className || ""}`}>
      {content && <h2>{content}</h2>}
      {children}
    </thead>
  );
};

/**
 * TableRow component for table rows
 * @param {TableProps} props - The props for the table row
 * @returns {JSX.Element} A styled table row
 */
export const TableRow: React.FC<TableProps> = ({ children, className }) => {
  return <tr className={`hover:bg-gray-50 ${className || ""}`}>{children}</tr>;
};

/**
 * TableHead component for table header cells
 * @param {TableProps} props - The props for the table header cell
 * @returns {JSX.Element} A styled table header cell
 */
export const TableHead: React.FC<TableProps> = ({ children, className }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 ${
        className || ""
      }`}
    >
      {children}
    </th>
  );
};

/**
 * TableBody component for table body
 * @param {TableProps} props - The props for the table body
 * @returns {JSX.Element} A styled table body
 */
export const TableBody: React.FC<TableProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

/**
 * TableCell component for table cells
 * @param {TableProps} props - The props for the table cell
 * @returns {JSX.Element} A styled table cell
 */
export const TableCell: React.FC<TableProps> = ({ children, className }) => {
  return (
    <td
      className={`px-2 py-2 sm:px-6 sm:py-4 whitespace-normal sm:whitespace-nowrap text-gray-700 ${
        className || ""
      }`}
    >
      {children}
    </td>
  );
};
