import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { getAllAnnonces } from "./actions";
import { Annonce } from "@/type";

export default async function Home() {
  // Appel côté serveur (RSC) → pas besoin de useEffect
  const annonces: Annonce[] = await getAllAnnonces();

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col py-10 w-full">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Le carrefour des logements
          </h1>
          <p className="py-6 text-gray-800 text-center">
            Bienvenue sur{" "}
            <span className="text-primary font-bold">NyumbaLink</span>,
            <br />
            votre plateforme de recherche de logements.
          </p>
          <div className="flex items-center justify-center">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={11} cy={11} r={8}></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input type="search" placeholder="Chercher" />
            </label>
          </div>
        </div>

        {/* Liste des annonces */}
        <ul className="grid md:grid-cols-3 gap-4 mt-10 w-full px-6">
          {annonces.length === 0 ? (
            <p className="text-center text-gray-500 col-span-3">
              Aucune annonce disponible pour le moment.
            </p>
          ) : (
            annonces.map((annonce) => (
              <li
                key={annonce.id}
                className="card bg-base-100 shadow-md p-4 rounded-lg"
              >
                {annonce.images && annonce.images[0] && (
                  <div className="relative w-full h-48 mb-3">
                    <Image
                      src={annonce.images[0]}
                      alt="Image annonce"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <h2 className="font-bold text-lg">{annonce.commune}</h2>
                <p className="text-sm text-gray-600">{annonce.quartier}</p>
                <p className="mt-2">{annonce.description}</p>
                <Link
                  href={`/annonce/${annonce.id}`}
                  className="btn btn-primary mt-4 w-full"
                >
                  Voir plus
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
