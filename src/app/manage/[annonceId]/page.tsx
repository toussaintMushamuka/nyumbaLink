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
  const [editing, setEditing] = useState(false); // état du popup

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

  // Callback après mise à jour
  const handleUpdated = (updatedAnnonce: Annonce) => {
    setAnnonce(updatedAnnonce);
    setEditing(false); // fermer le popup
  };

  return (
    <Wrapper>
      {annonce ? (
        <div className="flex md:flex-row flex-col gap-4">
          {/* Colonne gauche : Carte de l'annonce */}
          <div className="md:w-1/3">
            <AnnonceItemId annonce={annonce} />

            <button
              className="btn mt-4 w-full"
              onClick={() => setEditing(true)}
            >
              Modifier l'annonce
            </button>
          </div>

          {/* Colonne droite : Tableau des détails */}
          <div className="overflow-x-auto md:mt-0 mt-4 md:w-2/3">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Commune</th>
                    <th>Quartier</th>
                    <th>Avenue</th>
                    <th>NumTél</th>
                    <th>Chambres</th>
                    <th>Description</th>
                    <th>Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{annonce.commune}</td>
                    <td>{annonce.quartier}</td>
                    <td>{annonce.avenue}</td>
                    <td>{annonce.numTel}</td>
                    <td>{annonce.nombreDeChambre}</td>
                    <td>{annonce.description}</td>
                    <td>Oui</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Popup modal DaisyUI */}
          {editing && annonce && (
            <dialog id="update-modal" className="modal modal-open">
              <form
                method="dialog"
                className="modal-box w-full max-w-3xl relative p-6"
              >
                {/* Bouton de fermeture */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setEditing(false)}
                >
                  ✕
                </button>

                <h3 className="font-bold text-lg mb-4">Modifier l'annonce</h3>

                {/* Formulaire de modification */}
                <UpdateAnnonceForm
                  annonce={annonce}
                  onUpdated={handleUpdated}
                />
              </form>
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
