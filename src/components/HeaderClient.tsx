"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface NavLink {
  href: string;
  label: string;
}

interface HeaderClientProps {
  navLinks: NavLink[];
}

const HeaderClient = ({ navLinks }: HeaderClientProps) => {
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize the header classes to prevent unnecessary recalculations
  const headerClasses = useMemo(() => {
    const isHome = pathname === "/";
    const baseClasses =
      "fixed top-0 left-0 right-0 z-[99999] transition-all duration-300";
    const scrolledClasses = "bg-white/90 backdrop-blur-md text-black shadow-md";
    const defaultClasses = isHome ? "text-white" : "text-black";

    // Set the final class string based on conditions
    if (isScrolled && !isMobileMenuOpen) {
      return `${baseClasses} ${scrolledClasses}`;
    } else {
      return `${baseClasses} ${defaultClasses}`;
    }
  }, [isScrolled, pathname, isMobileMenuOpen]);

  // Memoize navigation link classes
  const getLinkClasses = useMemo(() => {
    const isHome = pathname === "/";
    return isHome && !isScrolled ? "text-white" : "text-black";
  }, [isScrolled, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 40;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current as HTMLElement;
    const tl = gsap.timeline({ paused: true });

    // Setup initial state
    gsap.set(menu, {
      y: "100%",
      opacity: 0,
      display: "none",
    });

    // Create animation timeline
    tl.to(menu, {
      display: "block",
      duration: 0,
    }).to(menu, {
      y: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      menu.style.pointerEvents = "auto";
      tl.play();
    } else {
      document.body.style.overflow = "";
      menu.style.pointerEvents = "none";
      tl.reverse();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`flex flex-col text-center relative z-50 ${pathname == "/" && isMobileMenuOpen ? "text-black" : isScrolled || pathname != "/" ? "text-black" : "text-white"}`}
          >
            <span className="text-lg font-bold md:text-2xl tracking-wider">
              ARMS
            </span>
            <span className="text-[0.6rem] md:text-sm tracking-widest">
              ROBOTICS CLUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8 lg:space-x-12 text-sm lg:text-base uppercase font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`hover:text-blue-500 transition-colors py-2 ${getLinkClasses}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className={`w-6 h-6 ${getLinkClasses}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div ref={menuRef} className="fixed inset-0 bg-white md:hidden">
          <div className="h-full pt-20 px-4">
            <ul className="flex flex-col items-center justify-center space-y-10 text-2xl font-semibold uppercase mt-20">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderClient;
