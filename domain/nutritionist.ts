export interface Nutritionist {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  specialty: string;
  experience: string;
  crn: string;
  availability: string;
  userId: number;
}

export interface UpdateNutritionistData {
  name?: string;
  phone?: string;
  email?: string;
  specialty?: string;
  experience?: string;
  availability?: string;
}
