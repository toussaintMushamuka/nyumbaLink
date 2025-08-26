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
