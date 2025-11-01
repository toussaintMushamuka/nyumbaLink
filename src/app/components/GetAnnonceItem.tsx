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
      className="bg-white  rounded-xl overflow-hidden hover:transition-shadow"
    >
      {/* Mini carousel */}
      <div
        className="relative w-full h-48 overflow-hidden cursor-pointer"
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
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Boutons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/70"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/70"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {annonce.images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-green-600 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contenu de l'annonce */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg text-green-700">
            {annonce.commune}
          </h2>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Disponible
          </span>
        </div>

        <h3 className="font-medium text-gray-800">
          {annonce.quartier} - {annonce.avenue}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {annonce.description.length > 100
            ? annonce.description.substring(0, 100) + "..."
            : annonce.description}
        </p>
        <p className="text-sm text-gray-700 mt-2">📞 {annonce.numTel}</p>

        <Link
          href={`https://wa.me/${annonce.numTel}?text=Bonjour, je suis intéressé par votre annonce sur NyumbaLink`}
          target="_blank"
        >
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            WhatsApp
          </button>
        </Link>
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

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/70"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/70"
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
