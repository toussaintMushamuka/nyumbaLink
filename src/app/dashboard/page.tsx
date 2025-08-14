"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  getReachBudgets,
  getTotalTransactionAmount,
  getTotalTransactionCount,
  getUserBudgetData,
} from "../actions";
import Wrapper from "../components/Wrapper";
import { CircleDollarSign, Landmark, PiggyBank } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const page = () => {
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [reacheBudgetsRatio, setReacheBudgetsRatio] = useState<string | null>(
    null
  );
  const [budgetData, setBudgetData] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress as string;
      if (email) {
        const amount = await getTotalTransactionAmount(email);
        const count = await getTotalTransactionCount(email);
        const reacheBudgetsRatio = await getReachBudgets(email);
        const budgetData = await getUserBudgetData(email);
        setTotalAmount(amount ?? null);
        setTotalCount(count ?? null);
        setReacheBudgetsRatio(reacheBudgetsRatio ?? null);
        setBudgetData(budgetData ?? []);
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
            <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">
                  Total des transactions
                </span>
                <span className="text-2xl font-bold text-accent">
                  {totalAmount !== null ? `${totalAmount}$` : "N/A"}
                </span>
              </div>
              <CircleDollarSign className="bg-accent w-9 h-9 rounded-full p-1 text-white" />
            </div>
            <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">
                  Nombre de transactions
                </span>
                <span className="text-2xl font-bold text-accent">
                  {totalCount !== null ? `${totalCount}` : "N/A"}
                </span>
              </div>
              <PiggyBank className="bg-accent w-9 h-9 rounded-full p-1 text-white" />
            </div>
            <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">Budgets atteints</span>
                <span className="text-2xl font-bold text-accent">
                  {reacheBudgetsRatio || "N/A"}
                </span>
              </div>
              <Landmark className="bg-accent w-9 h-9 rounded-full p-1 text-white" />
            </div>
          </div>
          <div className="w-full md:flex mt-4">
            <div className="rounded-xl md:w-2/3">
              <div>
                <BarChart width={730} height={250} data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalBudgetAmount" fill="#8884d8" />
                  <Bar dataKey="totalTransactionAmount" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
            <div className="md:w-2-1/3 ml-4"></div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default page;
