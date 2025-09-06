"use client";

import { Annonce } from "@/type";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GetAnnonceItemProps {
  annonce: Annonce;
}

const GetAnnonceItem: React.FC<GetAnnonceItemProps> = ({ annonce }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? annonce.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === annonce.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <li
      key={annonce.id}
      className="border-base-300 border-2 p-4 rounded-xl list-none"
    >
      <div className="card bg-base-100 w-full">
        {/* Mini carousel */}
        <div
          className="relative w-full h-48 overflow-hidden rounded-t-xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {annonce.images.map((img, idx) => (
              <div key={idx} className="relative w-full h-48 flex-shrink-0">
                <Image
                  src={img}
                  alt={`Image ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover rounded-t-xl"
                />
              </div>
            ))}
          </div>

          {/* Bouton précédent */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Bouton suivant */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {annonce.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-white scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenu de l'annonce */}
        <div className="card-body">
          <div className="flex justify-between  items-center">
            <h2 className="card-title">{annonce.commune}</h2>
            <div className="text-sm bg-accent rounded-md text-white p-2">
              Disponible
            </div>
          </div>
          <h2 className="card-title">
            {annonce.quartier} - {annonce.avenue}
          </h2>
          <p className="text-gray-500 text-sm">
            {annonce.description.length > 100
              ? annonce.description.substring(0, 100) + "..."
              : annonce.description}
          </p>
          <p className="text-gray-500 text-sm">Téléphone: {annonce.numTel}</p>
          <Link
            className="card-actions"
            href={`https://wa.me/${annonce.numTel}?text=Bonjour, je suis intéressé par votre annonce sur NyumbaLink`}
            target="_blank"
          >
            <button className="btn  bg-lime-500 text-white font-bold justify-end">
              WhatsApp
            </button>
          </Link>
        </div>
      </div>

      {/* Popup plein écran */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ✕
          </button>

          <div className="relative w-[90%] md:w-[70%] h-[80%] overflow-hidden rounded-lg">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {annonce.images.map((img, idx) => (
                <div key={idx} className="relative w-full h-full flex-shrink-0">
                  <Image
                    src={img}
                    alt={`Image ${idx + 1}`}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Boutons navigation */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default GetAnnonceItem;
