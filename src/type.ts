export interface annonce {
  id: number;
  images: string[]; // tableau d'URLs d'images
  description: string;
  commune: string;
  quartier: string;
  avenue: string;
  numTel: string;
  nombreDeChambre: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
