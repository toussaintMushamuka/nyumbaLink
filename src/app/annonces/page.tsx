"use client";
import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { addAnnonce } from "../actions";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { isReactCompilerRequired } from "next/dist/build/swc/generated-native";
import { toast } from "react-hot-toast";

const page = () => {
  const { user } = useUser();
  const [commune, setCommune] = useState<string>("");
  const [quartier, setQuartier] = useState<string>("");
  const [avenue, setAvenue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numTel, setNumTel] = useState<string>("");
  const [chambres, setChambres] = useState<string>("");
  const [images, setImages] = useState<string[]>([]); // tableau d'URLs

  const handleUploadComplete = (res: any) => {
    if (!res || res.length === 0) {
      toast.error("L'upload a échoué, veuillez réessayer.");
      return;
    }

    // Vérifie la structure et utilise res[0].url
    const urls = res
      .map((file: { url?: string }) => file.url)
      .filter((url: any): url is string => !!url);

    if (urls.length === 0) {
      console.log("Résultat brut UploadThing :", res); // 👀 pour vérifier
      toast.error("Aucune image valide trouvée.");
      return;
    }

    setImages(urls);
    toast.success("Image(s) uploadée(s) avec succès ✅");
  };

  const handeleAddAnnonce = async () => {
    try {
      // Vérification des champs obligatoires
      if (
        !commune.trim() ||
        !quartier.trim() ||
        !avenue.trim() ||
        !description.trim() ||
        !numTel.trim() ||
        !chambres.trim() ||
        images.length === 0
      ) {
        toast.error(
          "Veuillez compléter tous les champs avant de publier l'annonce."
        );
        return;
      }

      const numTelTrimmed = numTel.trim();
      const chambresNumber = parseInt(chambres, 10);

      if (isNaN(chambresNumber)) {
        toast.error("Le nombre de chambres doit être un nombre valide.");
        return;
      }

      await addAnnonce({
        email: user?.primaryEmailAddress?.emailAddress as string,
        images,
        description,
        commune,
        quartier,
        avenue,
        numTel: numTelTrimmed,
        nombreDeChambre: chambresNumber,
      });

      toast.success("Annonce publiée avec succès ✅");

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce :", error);
      toast.error(
        "Une erreur est survenue lors de la publication de l'annonce."
      );
    }
  };

  return (
    <Wrapper>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        Ajouter une annonce
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Ajouter une maison à louer</h3>
          <p className="py-4 text-center">
            {" "}
            Trouver rapidement un locataire en publiant votre annonce ici.
          </p>
          <div className="w-full flex flex-col">
            <input
              className="input input-bordered w-full mb-3"
              type="text"
              value={commune}
              placeholder="enter la commune ex: Kadutu"
              onChange={(e) => setCommune(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full mb-3"
              type="text"
              value={quartier}
              placeholder="enter le quartier ex: Nyamugo"
              onChange={(e) => setQuartier(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full mb-3"
              type="text"
              value={avenue}
              placeholder="enter l'avenue ex: avenue du commerce"
              onChange={(e) => setAvenue(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full mb-3"
              type="text"
              value={description}
              placeholder="enter une description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full mb-3"
              type="text"
              value={numTel}
              placeholder="enter le numero de telephone"
              onChange={(e) => setNumTel(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full mb-3"
              type="number"
              value={chambres}
              placeholder="enter le nombre de chambres"
              onChange={(e) => setChambres(e.target.value)}
              required
            />
            <div>
              <UploadButton
                className="input input-bordered w-full mb-3"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  handleUploadComplete(res);
                }}
              />

              {/* Aperçu des images uploadées */}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {images.map((url, index) => (
                    <div key={index} className="w-24 h-24 relative">
                      <img
                        src={url}
                        alt={`aperçu-${index}`}
                        className="w-full h-full object-cover rounded-md shadow"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="btn bg-accent" onClick={handeleAddAnnonce}>
              Publier l'annonce
            </button>
          </div>
        </div>
      </dialog>
    </Wrapper>
  );
};

export default page;
