import { NextResponse } from "next/server";
import { addAnnonce, getAnnoncesByUser } from "../../actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email manquant" }, { status: 400 });
  }

  try {
    const annonces = await getAnnoncesByUser(email);
    return NextResponse.json(annonces);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const annonce = await addAnnonce(body);
    return NextResponse.json(annonce);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
