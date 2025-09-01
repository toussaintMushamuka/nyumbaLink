import { Annonce } from "@/type";
import Image from "next/image";
import React from "react";

interface AnnonceItemProps {
  annonce: Annonce;
}

const annonceItem: React.FC<AnnonceItemProps> = ({ annonce }) => {
  return (
    <div>
      <li
        key={annonce.id}
        className="border-base-300 border-2 p-4 rounded-xl list-none hover:border-accent transition-shadow duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="card bg-base-100 w-full">
            <figure>
              <Image
                src={
                  annonce.images && annonce.images.length > 0
                    ? annonce.images[0]
                    : "/placeholder.png"
                } // Affiche la première image de l'annonce
                alt="Annonce Image"
                className="w-full h-full image-full object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {annonce.commune} - {annonce.quartier}
              </h2>
              <p className="text-gray-500 text-sm">
                {annonce.description.length > 100
                  ? annonce.description.substring(0, 100) + "..."
                  : annonce.description}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-accent">voir plus</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default annonceItem;
