export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: "patient" | "nutritionist";
  nutritionistId?: number;
  crn?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  type: "patient" | "nutritionist";
  nutritionistId?: number;
  crn?: string;
}
