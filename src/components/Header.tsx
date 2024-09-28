import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
const Header = () => {
  const {  userId  } = auth()
  return (
    <div className="bg-transparent text-white mix-blend-difference fixed top-0 left-0 right-0 z-[99999]">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <Link href={"/"} className="flex flex-col text-xl text-center">
          <span className="text-lg font-semibold sm:text-2xl">ARMS</span>
          <span className="sm:text-2xl text-[0.6rem]">ROBOTICS CLUB</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 text-sm uppercase sm:space-x-10 sm:text-xl">
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
              {userId ? (
                <Link href="/cart" className="hover:text-gray-300">
                  Cart
                </Link>
              ) : (
                <Link href="/sign-up" className="hover:text-gray-300">
                  SignIn
                </Link>
              )}

              {/* {isMounted && cartCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-black bg-red-500 rounded-full -top-2 -right-3">
                  {cartCount}
                </span>
              )} */}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Header;
