"use client";

import React, { useState } from "react";
import { updateAnnonceById } from "@/app/actions";
import { Annonce } from "@/type";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface UpdateAnnonceFormProps {
  annonce: Annonce;
  onUpdated: (updatedAnnonce: Annonce) => void;
}

const UpdateAnnonceForm: React.FC<UpdateAnnonceFormProps> = ({
  annonce,
  onUpdated,
}) => {
  const [description, setDescription] = useState(annonce.description);
  const [commune, setCommune] = useState(annonce.commune);
  const [quartier, setQuartier] = useState(annonce.quartier);
  const [avenue, setAvenue] = useState(annonce.avenue);
  const [numTel, setNumTel] = useState(annonce.numTel);
  const [nombreDeChambre, setNombreDeChambre] = useState(
    annonce.nombreDeChambre
  );
  const [images, setImages] = useState<string[]>(annonce.images || []);
  const [loading, setLoading] = useState(false);

  const handleUploadComplete = (res: any) => {
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

    setImages((prev) => [...prev, ...urls]); // ajouter les nouvelles images
    toast.success("Image(s) ajoutée(s) avec succès ✅");
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation côté client
    if (
      !description.trim() ||
      !commune.trim() ||
      !quartier.trim() ||
      !avenue.trim() ||
      !numTel.trim() ||
      !nombreDeChambre ||
      images.length === 0
    ) {
      toast.error("Tous les champs et au moins une image sont obligatoires ❌");
      return;
    }

    setLoading(true);

    try {
      const updated = await updateAnnonceById({
        id: annonce.id,
        description,
        commune,
        quartier,
        avenue,
        numTel,
        nombreDeChambre,
        images,
      });

      onUpdated(updated);
      toast.success("Annonce mise à jour avec succès ✅");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      <input
        className="input input-bordered w-full"
        value={commune}
        placeholder="Commune"
        onChange={(e) => setCommune(e.target.value)}
        required
      />
      <input
        className="input input-bordered w-full"
        value={quartier}
        placeholder="Quartier"
        onChange={(e) => setQuartier(e.target.value)}
        required
      />
      <input
        className="input input-bordered w-full"
        value={avenue}
        placeholder="Avenue"
        onChange={(e) => setAvenue(e.target.value)}
        required
      />
      <input
        className="input input-bordered w-full"
        value={numTel}
        placeholder="Numéro de téléphone"
        onChange={(e) => setNumTel(e.target.value)}
        required
      />
      <input
        type="number"
        className="input input-bordered w-full"
        value={nombreDeChambre}
        placeholder="Nombre de chambres"
        onChange={(e) => setNombreDeChambre(Number(e.target.value))}
        required
      />
      <input
        type="text"
        className="textarea textarea-bordered w-full h-24"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Upload d'images */}
      <UploadButton
        className="w-full"
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        content={{
          button: "Ajouter des images",
          allowedContent: "Tu peux ajouter plusieurs images (max 4MB chacune)",
        }}
        appearance={{
          button: "btn btn-accent w-full mt-2",
          container: "flex flex-col gap-2",
          allowedContent: "text-sm text-gray-500",
        }}
      />

      {/* Aperçu des images avec possibilité de suppression */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {images.map((url, index) => (
            <div key={index} className="w-24 h-24 relative">
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-md shadow"
              />
              <button
                type="button"
                className="absolute top-0 right-0 text-white  rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-accent w-full mt-4"
        disabled={loading}
      >
        {loading ? "Mise à jour..." : "Enregistrer"}
      </button>
    </form>
  );
};

export default UpdateAnnonceForm;
