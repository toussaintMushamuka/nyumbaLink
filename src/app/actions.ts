"use server";

import prisma from "@/lib/prisma";

export async function chekAndAddUser(mail: string | undefined) {
  if (!mail) return;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: mail },
    });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: mail,
        },
      });
      console.log("Utilisateur ajouté  :");
    } else {
      console.log("L'utilisateur existe déjà :");
    }
  } catch (error) {
    console.log("Erreur lors de l'ajout de l'utilisateur :", error);
  }
}

interface AddAnnonceInput {
  email: string;
  images: string[]; // tableau d'URLs d'images uploadées
  description: string;
  commune: string;
  quartier: string;
  avenue: string;
  numTel: string;
  nombreDeChambre: number;
}

export async function addAnnonce(input: AddAnnonceInput) {
  const {
    email,
    images,
    description,
    commune,
    quartier,
    avenue,
    numTel,
    nombreDeChambre,
  } = input;

  try {
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Utilisateur non trouvé");

    // Créer l'annonce dans la base
    const annonce = await prisma.annonce.create({
      data: {
        images,
        description,
        commune,
        quartier,
        avenue,
        numTel,
        nombreDeChambre,
        userId: user.id,
      },
    });

    return annonce;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce :", error);
    throw error; // On relance l'erreur pour que le front la capture
  }
}

export async function getAnnoncesByUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { annonces: true },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return user.annonces;
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    throw error;
  }
}

export async function getAnnonceById(annonceId: string) {
  try {
    const annonce = await prisma.annonce.findUnique({
      where: { id: annonceId },
      include: { user: true },
    });
    if (!annonce) {
      throw new Error("Annonce non trouvée");
    }
    return annonce;
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    throw error;
  }
}
