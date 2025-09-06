"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import GetAnnonceItem from "./components/GetAnnonceItem";
import { Annonce } from "@/type";
import { getAllAnnonces } from "./actions";
import Footer from "./components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filtered, setFiltered] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true); // ✅ état de chargement

  // Charger les annonces au montage
  useEffect(() => {
    async function fetchAnnonces() {
      try {
        const data = await getAllAnnonces();
        setAnnonces(data);
        setFiltered(data);
      } catch (error) {
        console.error("Erreur lors du chargement des annonces", error);
      } finally {
        setLoading(false); // ✅ après le chargement (succès ou erreur)
      }
    }
    fetchAnnonces();
  }, []);

  // Filtrage en temps réel
  useEffect(() => {
    const lower = search.toLowerCase();
    const results = annonces.filter(
      (annonce) =>
        annonce.commune.toLowerCase().includes(lower) ||
        annonce.quartier.toLowerCase().includes(lower) ||
        annonce.avenue.toLowerCase().includes(lower) ||
        annonce.description.toLowerCase().includes(lower)
    );
    setFiltered(results);
  }, [search, annonces]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col py-10 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Le carrefour des logements
        </h1>
        <p className="py-6 text-gray-800 text-center">
          Bienvenue sur{" "}
          <span className="text-primary font-bold">NyumbaLink</span>
        </p>

        {/* Barre de recherche */}
        <div className="flex items-center justify-center">
          <label className="input">
            <input
              type="search"
              placeholder="Chercher (commune, quartier...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 rounded-lg border w-80"
            />
          </label>
        </div>

        {/* Liste des annonces filtrées */}
        <div>
          <div className="px-5 md:px-[10%] mt-10 mb-10">
            {loading ? ( // ✅ si en cours de chargement
              <p className="text-gray-500 text-center">
                Chargement des annonces...
              </p>
            ) : (
              <ul className="grid md:grid-cols-3 gap-4 mt-6">
                {filtered.length > 0 ? (
                  filtered.map((annonce) => (
                    <GetAnnonceItem key={annonce.id} annonce={annonce} />
                  ))
                ) : (
                  <p className="text-gray-500 mt-4">Aucune annonce trouvée</p>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
