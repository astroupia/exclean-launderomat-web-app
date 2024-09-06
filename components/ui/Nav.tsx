"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { MenuItems, Menu, ProductItem } from "@/components/shared/Menu";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Service, Contact, Dashboard } from "@/public/assets/icons";

const Nav: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white">
        <section className="mx-20 flex items-center justify-center">
          <Link href="/">
            <h1 className="text-l font-bold text-indigo-700">Exclean</h1>
          </Link>
          <Menu setActive={setActive}>
            <SignedIn>
              <Link href="/dashboard">
                <h1 className="text-l text-indigo-700">Dashboard</h1>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="#service">
                <h1 className="text-l text-indigo-700">Service</h1>
              </Link>
            </SignedOut>
            <Link href="#contact">
              <h1 className="text-l text-indigo-700">Contact</h1>
            </Link>
          </Menu>
          <SignedIn>
            <UserButton />
            {/* <Mobilenav /> */}
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button content="Join Us!" />
            </Link>
          </SignedOut>
        </section>
      </div>
    </>
  );
};

export default Nav;
