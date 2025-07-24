"use client";
import { getTransactionByBudgetId } from "@/app/actions";
import BudgetItm from "@/app/components/BudgetItm";
import Wrapper from "@/app/components/Wrapper";
import { Budget } from "@/type";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: Promise<{ budgetId: string }> }) => {
  const [budgetId, setBudgetId] = useState<string>("");
  const [budget, setBudget] = useState<Budget>();

  async function fetchBudgetData(budgetId: string) {
    try {
      if (budgetId) {
        const budgetData = await getTransactionByBudgetId(budgetId);
        setBudget(budgetData);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de budget et des transactions:",
        error
      );
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setBudgetId(resolvedParams.budgetId);
      fetchBudgetData(resolvedParams.budgetId);
    };
    getId();
  }, [params]);
  return (
    <Wrapper>
      {budget && <BudgetItm budget={budget} enableHover={0}></BudgetItm>}
    </Wrapper>
  );
};

export default page;
