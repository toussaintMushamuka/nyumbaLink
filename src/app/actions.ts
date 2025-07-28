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

export async function addTrasactionToBudget(
  budgetId: string,
  amount: number,
  description: string
) {
  try {
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
      include: {
        transactions: true,
      },
    });
    if (!budget) {
      throw new Error("Budget non trouvé");
    }
    const totalTransaction = budget.transactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);

    const totalWithNewTransaction = totalTransaction + amount;
    if (totalWithNewTransaction > budget.amount) {
      throw new Error("Le montant total des transactions dépasse le budget");
    }
    // Ajout de la nouvelle transaction
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        emoji: budget.emoji,
        budget: {
          connect: { id: budgetId },
        },
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction au budget", error);
    throw error;
  }
}

export const deleteBudget = async (budgetId: string) => {
  try {
    await prisma.transaction.deleteMany({
      where: { budgetId },
    });
    await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });
  } catch (error) {
    console.error(
      "Error lors de la suppression de budget et de ses transactions:",
      error
    );
    throw error;
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction) {
      throw new Error("Transaction non trouvé.");
    }
    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  } catch (error) {
    console.error("Error lors de la suppression de la transaction:", error);
    throw error;
  }
};
