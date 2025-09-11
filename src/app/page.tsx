"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import GetAnnonceItem from "./components/GetAnnonceItem";
import { Annonce } from "@/type";
import { getAllAnnonces } from "./actions";
import Footer from "./components/Footer";
import { Search } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filtered, setFiltered] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les annonces
  useEffect(() => {
    async function fetchAnnonces() {
      try {
        const data = await getAllAnnonces();
        setAnnonces(data);
        setFiltered(data);
      } catch (error) {
        console.error("Erreur lors du chargement des annonces", error);
      } finally {
        setLoading(false);
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
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex items-center justify-center flex-col pt-24 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-700">
          Le carrefour des logements
        </h1>
        <p className="py-6 text-gray-700 text-center text-lg">
          Bienvenue sur{" "}
          <span className="text-green-600 font-bold">NyumbaLink</span>
        </p>

        {/* Barre de recherche */}
        <div className="flex items-center justify-center mt-4">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
              size={20}
            />
            <input
              type="search"
              placeholder="Chercher (commune, quartier...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 p-3 rounded-xl border border-green-600 w-full focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Liste des annonces */}
        <div className="px-5 md:px-[10%] mt-12 mb-16 w-full">
          {loading ? (
            <p className="text-gray-500 text-center italic">
              Chargement des annonces...
            </p>
          ) : (
            <ul className="grid md:grid-cols-3 gap-6 mt-6">
              {filtered.length > 0 ? (
                filtered.map((annonce) => (
                  <div
                    key={annonce.id}
                    className="bg-white border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <GetAnnonceItem annonce={annonce} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  Aucune annonce trouvée
                </p>
              )}
            </ul>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
