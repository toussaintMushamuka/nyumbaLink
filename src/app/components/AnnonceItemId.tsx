import { Annonce } from "@/type";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface AnnonceItemIdProps {
  annonce: Annonce;
}

const AnnonceItemId: React.FC<AnnonceItemIdProps> = ({ annonce }) => {
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
    <div>
      <li
        key={annonce.id}
        className="border-base-300 border-2 p-4 rounded-xl list-none"
      >
        <div className="flex items-center justify-between">
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
                  <img
                    key={idx}
                    src={img}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
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
                      idx === currentIndex
                        ? "bg-white scale-110"
                        : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Contenu de l'annonce */}
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
                <button className="btn btn-accent">Disponible</button>
                <button className="btn">Indisponible</button>
              </div>
            </div>
          </div>
        </div>
      </li>

      {/* Popup plein écran avec slide */}
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
                <img
                  key={idx}
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-full object-contain flex-shrink-0"
                />
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
    </div>
  );
};

export default AnnonceItemId;
