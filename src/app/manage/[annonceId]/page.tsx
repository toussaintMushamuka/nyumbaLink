"use client";

import { getAnnonceById } from "@/app/actions";
import AnnonceItemId from "@/app/components/AnnonceItemId";
import UpdateAnnonceForm from "@/app/components/UpdateAnnonceForm";
import Wrapper from "@/app/components/Wrapper";
import { Annonce } from "@/type";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ annonceId: string }> }) => {
  const [annonceId, setAnnonceId] = useState<string | null>(null);
  const [annonce, setAnnonce] = useState<Annonce>();
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchAnnonceData(annonceId: string) {
    try {
      if (annonceId) {
        const annonceData = await getAnnonceById(annonceId);
        setAnnonce(annonceData);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'annonce :",
        error
      );
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setAnnonceId(resolvedParams.annonceId);
      fetchAnnonceData(resolvedParams.annonceId);
    };
    getId();
  }, [params]);

  const handleUpdated = (updatedAnnonce: Annonce) => {
    setAnnonce(updatedAnnonce);
    setModalOpen(false);
  };

  return (
    <Wrapper>
      {annonce ? (
        <div className="flex flex-col md:flex-row gap-6 py-8 px-5 md:px-[10%] bg-white rounded-xl shadow-md">
          {/* Colonne gauche : carte */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <AnnonceItemId annonce={annonce} />
            <button
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition"
              onClick={() => setModalOpen(true)}
            >
              Modifier l'annonce
            </button>
          </div>

          {/* Colonne droite : tableau des détails */}
          <div className="md:w-2/3 mt-6 md:mt-0">
            <div className="overflow-x-auto rounded-xl border border-green-200 shadow-sm">
              <table className="table-auto w-full text-left">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="py-2 px-3">Commune</th>
                    <th className="py-2 px-3">Quartier</th>
                    <th className="py-2 px-3">Avenue</th>
                    <th className="py-2 px-3">NumTél</th>
                    <th className="py-2 px-3">Chambres</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3">Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-green-50 text-green-700 even:bg-green-100">
                    <td className="py-2 px-3">{annonce.commune}</td>
                    <td className="py-2 px-3">{annonce.quartier}</td>
                    <td className="py-2 px-3">{annonce.avenue}</td>
                    <td className="py-2 px-3">{annonce.numTel}</td>
                    <td className="py-2 px-3">{annonce.nombreDeChambre}</td>
                    <td className="py-2 px-3">{annonce.description}</td>
                    <td className="py-2 px-3 text-green-700 font-semibold">
                      Oui
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal DaisyUI */}
          {modalOpen && (
            <dialog className="modal modal-open">
              <div className="modal-box w-full max-w-4xl relative">
                {/* Bouton fermeture */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>

                <h3 className="font-bold text-xl mb-4 text-green-700">
                  Modifier l'annonce
                </h3>

                {/* Formulaire de mise à jour */}
                {annonce && (
                  <UpdateAnnonceForm
                    annonce={annonce}
                    onUpdated={handleUpdated}
                  />
                )}
              </div>
            </dialog>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Chargement de l'annonce...
        </p>
      )}
    </Wrapper>
  );
};

export default Page;
