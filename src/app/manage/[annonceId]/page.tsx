"use client";
import { getAnnonceById } from "@/app/actions";
import AnnonceItemId from "@/app/components/AnnonceItemId";
import Wrapper from "@/app/components/Wrapper";
import { Annonce } from "@/type";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: Promise<{ annonceId: string }> }) => {
  const [annonceId, setAnnonceId] = useState<string | null>(null);
  const [annonce, setAnnonce] = useState<Annonce>();

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

  return (
    <Wrapper>
      {annonce && (
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/3">
            <AnnonceItemId annonce={annonce} />
            <button className="btn mt-4">Modifier annonce l'annonce</button>
          </div>
          <div className="ovverflow-x-auto md:mt-0 mt-4 md:w-2/3 ml-4">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Commune</th>
                    <th>Quartier</th>
                    <th>Avenue</th>
                    <th>NumTél</th>
                    <th>Chambres</th>
                    <th>Description</th>
                    <th>Disponnible</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
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
        </div>
      )}
    </Wrapper>
  );
};

export default page;
