import { Transaction } from "@/type";
import Link from "next/link";
import React from "react";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <li key={transaction.id} className="flex justify-between items-center">
      <div className="my-4">
        <button className="btn rounded-full">
          <div className="badge badge-accent">-{transaction.amount}$</div>
          {transaction.budgetName}
        </button>
      </div>

      {/* Mobile */}
      <div className="flex flex-col items-end md:hidden">
        <span className="font-bold text-sm">{transaction.description}</span>
        <span className="text-sm">
          {transaction.createdAt.toLocaleDateString("fr-FR")} à{" "}
          {transaction.createdAt.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col items-end">
        <span className="font-bold text-sm">{transaction.description}</span>
        <span className="text-sm">
          {transaction.createdAt.toLocaleDateString("fr-FR")} à{" "}
          {transaction.createdAt.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="hidden md:flex">
        <Link className="btn" href={`/manage/${transaction.budgetId}`}>
          voir plus
        </Link>
      </div>
    </li>
  );
};

export default TransactionItem;
