"use client";
import { Transaction } from "@/type";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getTransactionByEmailPeriod } from "../actions";
import Wrapper from "../components/Wrapper";
import TransactionItem from "../components/TransactionItem";

const page = () => {
  const { user } = useUser();
  const [transactions, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTransactions = async (period: string) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      try {
        const transactionsData = await getTransactionByEmailPeriod(
          user?.primaryEmailAddress?.emailAddress,
          period
        );
        setTransaction(transactionsData);
        setLoading(false);
      } catch (error) {
        // Optionally handle the error, e.g. log or show a message
        console.error(
          "erreur lors de la recuperation de la transaction",
          error
        );
      }
    }
  };

  useEffect(() => {
    fetchTransactions("last30");
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <div>
      <Wrapper>
        <div className="flex justify-end mb-5">
          <select
            className="input input-bordered input-md "
            defaultValue="last30"
            onChange={(e) => fetchTransactions(e.target.value)}
          >
            <option value="last7">Dernier 7 jours</option>
            <option value="last30">Dernier 30 jours</option>
            <option value="last90">Dernier 90 jours</option>
            <option value="last365">Dernier 365 jours</option>
          </select>
        </div>

        <div className="overflow-x-auto w-full bg-base-200/35 p-5">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-gray-500 text-sm">
                Aucune Transaction à afficher
              </span>
            </div>
          ) : (
            <ul className="divide-y divide-base-300">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                ></TransactionItem>
              ))}
            </ul>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default page;
