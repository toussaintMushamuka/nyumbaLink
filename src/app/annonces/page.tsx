"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";
import { Annonce } from "@/type";
import Link from "next/link";
import { Landmark } from "lucide-react";
import AnnonceItem from "../components/annonceItem";
import Image from "next/image";

const Page = () => {
  const { user } = useUser();
  const [commune, setCommune] = useState("");
  const [quartier, setQuartier] = useState("");
  const [avenue, setAvenue] = useState("");
  const [description, setDescription] = useState("");
  const [numTel, setNumTel] = useState("");
  const [chambres, setChambres] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadComplete = (res: any) => {
    if (!res || res.length === 0) {
      toast.error("L'upload a échoué.");
      return;
    }
    const urls = res.map((file: { url?: string }) => file.url).filter(Boolean);
    setImages(urls);
    toast.success("Images uploadées ✅");
  };

  // ⚡ Fetch via API route
  const fetchAnnonces = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const res = await fetch(
        `/api/annonces?email=${user.primaryEmailAddress.emailAddress}`
      );
      const data = await res.json();
      if (res.ok) {
        setAnnonces(data);
      } else {
        toast.error(data.error || "Erreur lors de la récupération");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, [user?.primaryEmailAddress?.emailAddress]);

  const handleAddAnnonce = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !commune.trim() ||
      !quartier.trim() ||
      !avenue.trim() ||
      !description.trim() ||
      !numTel.trim() ||
      !chambres.trim() ||
      images.length === 0
    ) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const nombreDeChambre = parseInt(chambres, 10);
    if (isNaN(nombreDeChambre)) {
      toast.error("Nombre de chambres invalide.");
      return;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("Utilisateur non authentifié.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/annonces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
          images,
          description,
          commune,
          quartier,
          avenue,
          numTel,
          nombreDeChambre,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Annonce publiée ✅");
        setCommune("");
        setQuartier("");
        setAvenue("");
        setDescription("");
        setNumTel("");
        setChambres("");
        setImages([]);
        fetchAnnonces();

        const modal = document.getElementById(
          "my_modal_3"
        ) as HTMLDialogElement;
        modal?.close();
      } else {
        toast.error(data.error || "Erreur lors de la publication");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <button
        className="btn flex items-center gap-2"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Ajouter une annonce <Landmark className="w-4 h-4" />
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              (
                document.getElementById("my_modal_3") as HTMLDialogElement
              )?.close()
            }
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Ajouter une maison à louer</h3>
          <form
            className="flex flex-col gap-3 mt-3"
            onSubmit={handleAddAnnonce}
          >
            <input
              className="input input-bordered"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              placeholder="Commune"
              required
            />
            <input
              className="input input-bordered"
              value={quartier}
              onChange={(e) => setQuartier(e.target.value)}
              placeholder="Quartier"
              required
            />
            <input
              className="input input-bordered"
              value={avenue}
              onChange={(e) => setAvenue(e.target.value)}
              placeholder="Avenue"
              required
            />
            <textarea
              className="textarea textarea-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <input
              className="input input-bordered"
              value={numTel}
              onChange={(e) => setNumTel(e.target.value)}
              placeholder="Numéro de téléphone"
              required
            />
            <input
              className="input input-bordered"
              type="number"
              value={chambres}
              onChange={(e) => setChambres(e.target.value)}
              placeholder="Nombre de chambres"
              required
            />

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
            />

            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((url, idx) => (
                  <div key={idx} className="w-24 h-24 relative">
                    <Image
                      src={url}
                      alt={`preview-${idx}`}
                      fill
                      className="object-cover rounded-md shadow"
                    />
                  </div>
                ))}
              </div>
            )}

            <button className="btn btn-accent mt-4" disabled={loading}>
              {loading ? "Publication..." : "Publier l'annonce"}
            </button>
          </form>
        </div>
      </dialog>

      <ul className="grid md:grid-cols-3 gap-4 mt-4">
        {annonces.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Vous n'avez pas encore publié d'annonces.
          </p>
        ) : (
          annonces.map((annonce) => (
            <Link href={`/manage/${annonce.id}`} key={annonce.id}>
              <AnnonceItem annonce={annonce} />
            </Link>
          ))
        )}
      </ul>
    </Wrapper>
  );
};

export default Page;
