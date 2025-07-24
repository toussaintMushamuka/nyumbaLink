"use server";

import prisma from "@/lib/prisma";

export async function checkAndAddUser(email: string | undefined) {
  if (!email) return;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: { email },
      });
      console.log("nouvel utilisateur ajouté :");
    }
    console.log("utilisateur existant trouvé :");
  } catch (error) {
    console.error("Error checking and adding user:", error);
  }
}
export async function addBudget(
  email: string,
  name: string,
  amount: number,
  selectedEmoji: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.budget.create({
      data: {
        name,
        amount,
        emoji: selectedEmoji,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error;
  }
}
export async function getBudgetsByUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.budgets;
  } catch (error) {
    console.error("Erreur lors de la recuperation des budgets", error);
  }
}

export async function getTransactionByBudgetId(budgetId: string) {
  try {
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
      include: {
        transactions: true,
      },
    });
    if (!budget) {
      throw new Error("Budget not found");
    }
    return budget;
  } catch (error) {
    console.error("Erreur lors de la recuperation des transactions", error);
  }
}
