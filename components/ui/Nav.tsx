"use client";

import React, { useState } from "react";
import { MenuItems, Menu, ProductItem } from "@/components/shared/Menu";
import Image from "next/image";
import Logo from "@/public/assets/images/Logo.png";

const Nav = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <section className="bg-white flex items-center justify-center">
        <Image src={Logo} width={30} height={30} alt="" />
        <Menu setActive={setActive}>
          <MenuItems item="Home" setActive={setActive} active={active}>
            <ProductItem
              title="Welcome Home"
              description="This is the homepage."
              href="/home"
              src="/images/home.png"
            />
          </MenuItems>
          <MenuItems item="About" setActive={setActive} active={active}>
            <ProductItem
              title="About Us"
              description="Learn more about our company."
              href="/about"
              src="/images/about.png"
            />
          </MenuItems>
          <MenuItems item="Services" setActive={setActive} active={active}>
            <ProductItem
              title="Our Services"
              description="Explore the services we offer."
              href="/services"
              src="/images/services.png"
            />
          </MenuItems>
          <MenuItems item="Contact" setActive={setActive} active={active}>
            <ProductItem
              title="Get in Touch"
              description="Contact us for more information."
              href="/contact"
              src="/images/contact.png"
            />
          </MenuItems>
        </Menu>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Join Us!
        </button>
      </section>
    </>
  );
};

export default Nav;
