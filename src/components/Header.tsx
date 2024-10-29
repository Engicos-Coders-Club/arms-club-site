// Header.tsx (Server Component)
import React from "react";
import { auth } from "@clerk/nextjs/server";
import HeaderClient from "./HeaderClient";

const Header = () => {
  const { userId } = auth();

  const navLinks = [
    { href: "/product", label: "Product" },
    { href: "/team", label: "Team" },
    { href: "/events", label: "Events" },
    {
      href: userId ? "/cart" : "/sign-up",
      label: userId ? "Cart" : "Sign In",
    },
  ];

  return <HeaderClient navLinks={navLinks} />;
};

export default Header;