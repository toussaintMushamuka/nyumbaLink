export interface Annonce {
  id: string;
  images: string[];
  description: string;
  commune: string;
  quartier: string;
  avenue: string;
  numTel: string;
  nombreDeChambre: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    email: string;
    name?: string | null;
    phone?: string | null;
    createdAt: Date;
  };
}
