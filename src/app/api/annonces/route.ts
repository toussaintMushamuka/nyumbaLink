import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET = liste des annonces (public)
export async function GET() {
  const annonces = await prisma.annonce.findMany({
    include: { user: true },
  });
  return Response.json(annonces);
}

// POST = créer une annonce (seulement connecté)
export async function POST(req: Request) {
  const { userId } = await auth(); // vérifie si connecté
  if (!userId) return new Response("Non autorisé", { status: 401 });

  const body = await req.json();

  const annonce = await prisma.annonce.create({
    data: {
      commune: body.commune,
      quartier: body.quartier,
      avenue: body.avenue,
      chambres: body.chambres,
      telephone: body.telephone,
      images: body.images,
      userId,
    },
  });

  return Response.json(annonce);
}
