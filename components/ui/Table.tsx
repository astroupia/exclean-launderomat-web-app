import { FC, ReactNode } from "react";

interface TableProps {
  content?: String;
  children: ReactNode;
  className?: string;
}

export const Table: FC<TableProps> = ({ children, className }) => {
  return (
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      {children}
    </table>
  );
};

export const TableHeader: FC<TableProps> = ({
  content,
  children,
  className,
}) => {
  return (
    <thead className={`text-indigo-600 bg-gray-100 ${className}`}>
      <h2>{content}</h2>
      {children}
    </thead>
  );
};

export const TableRow: FC<TableProps> = ({ children, className }) => {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>;
};

export const TableHead: FC<TableProps> = ({ children, className }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
};

export const TableBody: FC<TableProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableCell: FC<TableProps> = ({ children, className }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-gray-700 ${className}`}>
      {children}
    </td>
  );
};
