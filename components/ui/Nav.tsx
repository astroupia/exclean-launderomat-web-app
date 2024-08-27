"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { MenuItems, Menu, ProductItem } from "@/components/shared/Menu";
import Image from "next/image";
import Logo from "@/public/assets/images/Logo.png";
import Link from "next/link";
import Button from "./Button";

const Nav: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white">
        <section className="mx-20 flex items-center justify-center">
          <Link href="/">
            {/* <Image src={Logo} width={50} height={50} alt="" /> */}
            <h1 className="text-l font-bold text-indigo-700">Exclean</h1>
          </Link>
          <Menu setActive={setActive}>
            <SignedIn>
              <MenuItems item="Dashboard" setActive={setActive} active={active}>
                <ProductItem
                  title="Welcome to Your Dashboard"
                  description="This is the homepage."
                  href="/dashboard"
                  src="/images/home.png"
                />
              </MenuItems>
            </SignedIn>
            <SignedOut>
              <MenuItems item="Services" setActive={setActive} active={active}>
                <ProductItem
                  title="Our Services"
                  description="Explore the services we offer."
                  href="#services"
                  src="/images/services.png"
                />
              </MenuItems>
            </SignedOut>
            <MenuItems item="Contact" setActive={setActive} active={active}>
              <ProductItem
                title="Get in Touch"
                description="Contact us for more information."
                href="#contact"
                src="/images/contact.png"
              />
            </MenuItems>
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
