"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { addBudget, getBudgetsByUser } from "../actions";
import Notification from "../components/Notification";
import { Budget } from "@/type";
import Link from "next/link";
import BudgetItm from "../components/BudgetItm";
import { Landmark } from "lucide-react";

const page = () => {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetamount, setBudgetAmount] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const [notification, setNotification] = useState<string>("");
  const closeNotification = () => {
    setNotification("");
  };
  const handleEmojiSelect = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };
  const handelAddBudget = async () => {
    try {
      const amount = parseFloat(budgetamount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Veuillez entrer un montant valide.");
      }
      await addBudget(
        user?.primaryEmailAddress?.emailAddress as string,
        budgetName,
        amount,
        selectedEmoji
      );
      fatchBudgets();
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      setNotification("Budget ajouté avec succès !");
      setBudgetAmount("");
      setBudgetName("");
      setSelectedEmoji("");
      setShowEmojiPicker(false);
    } catch (error) {
      setNotification(`Erreur lors de l'ajout du budget : ${error} `);
    }
  };

  useEffect(() => {
    fatchBudgets();
  }, [user?.primaryEmailAddress?.emailAddress]);
  const fatchBudgets = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const userBudgets = await getBudgetsByUser(
          user.primaryEmailAddress.emailAddress
        );
        setBudgets(userBudgets ?? []);
      } catch (error) {
        setNotification(
          `Erreur lors de la récupération des budgets : ${error}`
        );
      }
    }
  };

  return (
    <div>
      <Wrapper>
        {notification && (
          <Notification
            message={notification}
            onclose={closeNotification}
          ></Notification>
        )}
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            ).showModal()
          }
        >
          nouveau
          <Landmark className="w-4" />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Creation d'un budget</h3>
            <p className="py-4">Permet de controler ces depenses facilement</p>
            <div className="w-full flex flex-col">
              <input
                type="text"
                value={budgetName}
                placeholder="nom du budget"
                onChange={(e) => setBudgetName(e.target.value)}
                className="input input-bordered mb-4 w-full"
                required
              />
              <input
                type="number"
                value={budgetamount}
                placeholder="montant du budget"
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="input input-bordered mb-4 w-full"
                required
              />
              <button
                className="btn mb-3"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {" "}
                {selectedEmoji || "selectionnez un emoji"}{" "}
              </button>
              {showEmojiPicker && (
                <div className="flex justify-center items-center my-4">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
              )}

              <button onClick={handelAddBudget} className="btn">
                ajouter budget
              </button>
            </div>
          </div>
        </dialog>
        <ul className="grid md:grid-cols-3 mt-4 gap-4">
          {budgets.map((budget) => (
            <Link href={`/manage/${budget.id}`} key={budget.id}>
              <BudgetItm budget={budget} enableHover={1}></BudgetItm>
            </Link>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
};

export default page;
