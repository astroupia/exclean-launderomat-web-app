"use client";
import React from "react";
import { motion } from "framer-motion";
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

/**
 * MenuItems component for individual menu items
 * @param {MenuItemsProps} props - The props for the menu items
 * @returns {JSX.Element} A menu item with potential dropdown
 */
export const MenuItems: React.FC<MenuItemsProps> = ({
  setActive,
  active,
  item,
  children,
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointe hover:opacity-[0.9] text-indigo-500"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

/**
 * Menu component for navigation
 * @param {MenuProps} props - The props for the menu
 * @returns {JSX.Element} A navigation menu
 */
export const Menu: React.FC<MenuProps> = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative  border border-transparent bg-white shadow-input flex justify-center space-x-4 px-8 py-6
"
    >
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
