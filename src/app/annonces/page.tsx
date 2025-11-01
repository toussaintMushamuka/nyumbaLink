"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { addAnnonce, getAnnoncesByUser } from "../actions";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";
import { Annonce } from "@/type";
import Link from "next/link";
import { Landmark } from "lucide-react";
import AnnonceItem from "../components/annonceItem";
import Image from "next/image";

const Page = () => {
  const { user } = useUser();
  const [commune, setCommune] = useState<string>("");
  const [quartier, setQuartier] = useState<string>("");
  const [avenue, setAvenue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numTel, setNumTel] = useState<string>("");
  const [chambres, setChambres] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAnnonces, setLoadingAnnonces] = useState(true);
  const [uploading, setUploading] = useState(false); // ✅ état upload

  const handleUploadComplete = async (res: any) => {
    setUploading(true); // ✅ commence l'upload
    try {
      if (!res || res.length === 0) {
        toast.error("L'upload a échoué, veuillez réessayer.");
        return;
      }

      const urls = res
        .map((file: { url?: string }) => file.url)
        .filter((url: any): url is string => !!url);

      if (urls.length === 0) {
        toast.error("Aucune image valide trouvée.");
        return;
      }

      setImages(urls);
      toast.success("Image(s) uploadée(s) avec succès ✅");
    } finally {
      setUploading(false); // ✅ fin de l'upload
    }
  };

  const fetchAnnonces = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    setLoadingAnnonces(true);
    try {
      const userAnnonces = await getAnnoncesByUser(
        user.primaryEmailAddress.emailAddress
      );
      const annoncesWithUser = userAnnonces.map((annonce: any) => ({
        ...annonce,
        user: annonce.user ?? null,
      }));
      setAnnonces(annoncesWithUser);
    } catch (error) {
      toast.error("Erreur lors de la récupération des annonces.");
      console.error(error);
    } finally {
      setLoadingAnnonces(false);
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
      toast.error("Veuillez compléter tous les champs avant de publier.");
      return;
    }

    const chambresNumber = parseInt(chambres, 10);
    if (isNaN(chambresNumber)) {
      toast.error("Le nombre de chambres doit être un nombre valide.");
      return;
    }

    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("Utilisateur non authentifié.");
      return;
    }

    setLoading(true);

    try {
      await addAnnonce({
        email: user.primaryEmailAddress.emailAddress,
        images,
        description,
        commune,
        quartier,
        avenue,
        numTel,
        nombreDeChambre: chambresNumber,
      });

      toast.success("Annonce publiée avec succès ✅");

      // Réinitialiser le formulaire
      setCommune("");
      setQuartier("");
      setAvenue("");
      setDescription("");
      setNumTel("");
      setChambres("");
      setImages([]);

      fetchAnnonces();

      // Fermer la modal
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la publication.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calcul du formulaire valide
  const isFormValid =
    commune.trim() &&
    quartier.trim() &&
    avenue.trim() &&
    description.trim() &&
    numTel.trim() &&
    chambres.trim() &&
    images.length > 0 &&
    !loading &&
    !uploading;

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
        Ajouter une annonce
        <Landmark className="w-4 h-4" />
      </button>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_3"
              ) as HTMLDialogElement;
              modal?.close();
            }}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Ajouter une maison à louer</h3>
          <p className="py-4 text-center">
            Trouvez rapidement un locataire en publiant votre annonce ici.
          </p>

          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleAddAnnonce}
          >
            <input
              className="input input-bordered w-full"
              type="text"
              value={commune}
              placeholder="Commune ex: Kadutu"
              onChange={(e) => setCommune(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              type="text"
              value={quartier}
              placeholder="Quartier ex: Nyamugo"
              onChange={(e) => setQuartier(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              type="text"
              value={avenue}
              placeholder="Avenue ex: avenue du commerce"
              onChange={(e) => setAvenue(e.target.value)}
              required
            />
            <input
              className="textarea textarea-bordered w-full h-24"
              type="text"
              value={description}
              placeholder="Description, ex: 2 chambres, 1 salle de bain, 1 salon, 1 cuisine, 1 balcon"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              type="text"
              value={numTel}
              placeholder="Numéro de téléphone"
              onChange={(e) => setNumTel(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              type="number"
              value={chambres}
              placeholder="Nombre de chambres"
              onChange={(e) => setChambres(e.target.value)}
              required
            />

            {/* Upload images */}
            <UploadButton
              className="w-full"
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              content={{
                button: "Choisir des images",
                allowedContent:
                  "Tu peux ajouter jusqu'à 3 images (max 4MB chacune)",
              }}
              appearance={{
                button: "btn btn-accent mt-2 w-full",
                container: "flex flex-col gap-2",
                allowedContent: "text-sm text-gray-500",
              }}
            />

            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((url, index) => (
                  <div key={index} className="w-24 h-24 relative">
                    <Image
                      src={url}
                      alt={`aperçu-${index}`}
                      fill
                      className="object-cover rounded-md shadow"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-accent mt-4"
              disabled={!isFormValid} // ✅ bouton désactivé si formulaire incomplet ou upload en cours
            >
              {loading
                ? "Publication..."
                : uploading
                ? "Upload en cours..."
                : "Publier l'annonce"}
            </button>
          </form>
        </div>
      </dialog>

      {/* Liste des annonces */}
      {loadingAnnonces ? (
        <p className="text-center text-gray-500 mt-10">Chargement...</p>
      ) : annonces.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Vous n'avez pas encore publié d'annonces.
        </p>
      ) : (
        <ul className="grid md:grid-cols-3 gap-4 mt-4">
          {annonces.map((annonce) => (
            <Link href={`/manage/${annonce.id}`} key={annonce.id}>
              <AnnonceItem annonce={annonce} />
            </Link>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default Page;
