"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface MenuItemsProps {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}

export const MenuItems: React.FC<MenuItemsProps> = ({
  setActive,
  active,
  item,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActive("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActive]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setActive(isOpen ? "" : item);
  };

  return (
    <div ref={menuRef} className="relative">
      <motion.p
        onClick={handleToggle}
        className="cursor-pointer hover:opacity-[0.9] text-indigo-500"
      >
        {item}
      </motion.p>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={transition}
            className="absolute z-50 left-1/2 transform -translate-x-1/2 pt-2 w-screen sm:w-auto"
          >
            <motion.div
              layoutId="active"
              className="bg-white dark:bg-black backdrop-blur-sm rounded-lg overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl max-w-[90vw] sm:max-w-none mx-auto"
            >
              <motion.div layout className="w-full h-full p-4">
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ setActive, children }) => {
  return (
    <nav className="relative border border-transparent bg-white shadow-input flex justify-center space-x-4 px-4 py-3 sm:px-8 sm:py-6">
      {children}
    </nav>
  );
};

interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
}

/**
 * ProductItem component for displaying product information
 * @param {ProductItemProps} props - The props for the product item
 * @returns {JSX.Element} A product item display
 */
export const ProductItem: React.FC<ProductItemProps> = ({
  title,
  description,
  href,
  src,
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-indigo">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-indigo-500">
          {description}
        </p>
      </div>
    </Link>
  );
};

interface HoveredLinkProps {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}

/**
 * HoveredLink component for styled links
 * @param {HoveredLinkProps} props - The props for the hovered link
 * @returns {JSX.Element} A styled link
 */
export const HoveredLink: React.FC<HoveredLinkProps> = ({
  children,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className="text-indigo-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
