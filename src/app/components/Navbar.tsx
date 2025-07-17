"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { checkAndAddUser } from "../actions";

const navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      checkAndAddUser(user?.primaryEmailAddress?.emailAddress);
    }
  }, [user]);
  return (
    <div className="bg-base-200/10 px-5 md:px-[10%] py-4">
      {isLoaded &&
        (isSignedIn ? (
          <>
            <div className="flex justify-between items-center">
              <div className=" flex text-2xl items-center font-bold">
                <Link href="/" className="cursor-pointer">
                  e. <span className="text-accent"> Track</span>
                </Link>
              </div>
              <div className="md:flex hidden">
                <Link href={"/budgets"} className="btn">
                  Mes budgets
                </Link>
                <Link href={""} className="btn mx-4">
                  Tableau de bord
                </Link>
                <Link href={""} className="btn mx-4">
                  Mes Transactions
                </Link>
              </div>
              <UserButton />
            </div>

            <div className="flex md:hidden mt-2 justify-center">
              <Link href={"/budgets"} className="btn btn-sm">
                Mes budgets
              </Link>
              <Link href={""} className="btn btn-sm mx-4">
                Tableau de bord
              </Link>
              <Link href={""} className="btn btn-sm mx-4">
                Mes Transactions
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <div className=" flex text-2xl items-center font-bold">
                <Link href="/" className="cursor-pointer">
                  e. <span className="text-accent"> Track</span>
                </Link>
              </div>
              <div className="flex mt-2 justify-center">
                <Link href={"/sign-in"} className="btn btn-sm">
                  se connecter
                </Link>
                <Link href={"/sign-up"} className="btn btn-sm btn-accent mx-4">
                  s'inscrire
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default navbar;
