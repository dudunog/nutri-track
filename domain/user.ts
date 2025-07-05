import { UserPreferences } from "./user-preferences";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: "patient" | "nutritionist";
  nutritionistId?: number;
  crn?: string;
  preferences?: UserPreferences;
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
