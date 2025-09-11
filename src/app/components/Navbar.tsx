"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { chekAndAddUser } from "../actions";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      chekAndAddUser(user?.primaryEmailAddress?.emailAddress);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < lastScroll) {
        // On scroll vers le haut
        setIsScrolledUp(true);
      } else {
        // On scroll vers le bas
        setIsScrolledUp(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolledUp
          ? "bg-green-700 shadow-lg py-2"
          : "bg-green-700 shadow-md py-4"
      }`}
    >
      {isLoaded &&
        (isSignedIn ? (
          <div className="flex justify-between items-center text-white px-5 md:px-[10%]">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="NyumbaLink Logo"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </div>

            {/* Liens */}
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-lg font-semibold hover:text-gray-200 transition"
              >
                Accueil
              </Link>
              <Link
                href="/annonces"
                className="text-lg font-semibold hover:text-gray-200 transition"
              >
                Annonces
              </Link>
            </div>

            {/* Profil utilisateur */}
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex justify-between items-center text-white px-5 md:px-[10%]">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="NyumbaLink Logo"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </div>

            {/* Liens authentification */}
            <div className="flex gap-6">
              <Link
                href="/sign-in"
                className="text-lg font-semibold hover:text-gray-200 transition"
              >
                Se connecter
              </Link>
              <Link
                href="/sign-up"
                className="text-lg font-semibold hover:text-gray-200 transition"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
