import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col py-10 w-full">
        <div>
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
              <label className="input ">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <svg
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </svg>
                <input type="search" placeholder="Chercher" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
