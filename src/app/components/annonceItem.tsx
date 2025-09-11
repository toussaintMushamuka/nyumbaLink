import { Annonce } from "@/type";
import Image from "next/image";
import React from "react";

interface AnnonceItemProps {
  annonce: Annonce;
}

const AnnonceItem: React.FC<AnnonceItemProps> = ({ annonce }) => {
  return (
    <li
      key={annonce.id}
      className="bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-300 list-none flex flex-col"
    >
      {/* Image fixe */}
      <div className="relative w-full h-48 flex-shrink-0">
        <Image
          src={
            annonce.images && annonce.images.length > 0
              ? annonce.images[0]
              : "/placeholder.png"
          }
          alt="Annonce Image"
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-green-700 font-bold text-lg mb-2">
            {annonce.commune} - {annonce.quartier}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {annonce.description.length > 100
              ? annonce.description.substring(0, 100) + "..."
              : annonce.description}
          </p>
        </div>
        <div className="flex justify-end mt-auto">
          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition">
            Voir plus
          </button>
        </div>
      </div>
    </li>
  );
};

export default AnnonceItem;
