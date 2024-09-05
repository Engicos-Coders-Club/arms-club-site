'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/Context";
const Header = () => {
  const { cartCount } = useCart();
  
  useEffect(() => {
    console.log("Cart count updated:",cartCount ); 
  }, [cartCount]);

  return (
    <header className="bg-transparent text-white mix-blend-difference fixed top-0 left-0 right-0 z-[99999]">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link href={'/'} className="text-xl flex text-center flex-col">
          <span className="sm:text-2xl text-lg font-semibold">ARMS</span>
          <span className="sm:text-2xl text-[0.6rem]">ROBOTICS CLUB</span>
        </Link>
        <nav>
          <ul className="flex sm:space-x-10 space-x-6 sm:text-xl text-sm uppercase">
            <li>
              <Link href="/product" className="hover:text-gray-300">
                Product
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-gray-300">
                Team
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-gray-300">
                Events
              </Link>
            </li>
            <li className="relative">
              <Link href="/cart" className="hover:text-gray-300">
                Cart
              </Link>
              {cartCount >= 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
