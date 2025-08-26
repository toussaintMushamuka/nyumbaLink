"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";
import { chekAndAddUser } from "../actions";
const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      chekAndAddUser(user?.primaryEmailAddress?.emailAddress);
    }
  }, [user]);
  return (
    <div className=" bg-base-200/30 shadow-sm px-5 md:px-[10%] py-4">
      {isLoaded &&
        (isSignedIn ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="NyumbaLink Logo"
                width={80}
                height={80}
                className="cursor-pointer"
              />
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-lg font-semibold">
                Accueil
              </Link>
              <Link href="/annonces" className="text-lg font-semibold">
                Annonces
              </Link>
            </div>
            <UserButton />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="NyumbaLink Logo"
                  width={80}
                  height={80}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex gap-6">
                <Link href="/sign-in" className="text-lg font-semibold">
                  Se connecter
                </Link>
                <Link href="/sign-up" className="text-lg font-semibold">
                  S'inscrire
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
