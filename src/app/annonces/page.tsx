"use client";
import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { addAnnonce } from "../actions";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { isReactCompilerRequired } from "next/dist/build/swc/generated-native";

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
    // `res` est un tableau des fichiers uploadés avec leurs URLs
    const urls = res.map((file: { fileUrl: string }) => file.fileUrl);
    setImages(urls);
  };

  const handeleAddAnnonce = async () => {
    try {
      const numTelTrimmed = numTel.trim();
      const chambresNumber = parseInt(chambres, 10);
      if (isNaN(chambresNumber)) {
        throw new Error("Le nombre de chambres doit être un nombre valide.");
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

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce :", error);
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
              <UploadDropzone
                className="input input-bordered w-full mb-3"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  handleUploadComplete(res);
                }}
              />
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
