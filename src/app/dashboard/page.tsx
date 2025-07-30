"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getTotalTransactionAmount } from "../actions";
import Wrapper from "../components/Wrapper";

const page = () => {
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress as string;
      if (email) {
        const amount = await getTotalTransactionAmount(email);
        setTotalAmount(amount ?? null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Wrapper>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2">
              <span>Total des transactions</span>
              <span>{totalAmount !== null ? `${totalAmount}` : "N/A"}</span>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default page;
