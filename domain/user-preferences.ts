export interface UserPreferences {
  objective:
    | "lose-weight"
    | "maintain-weight"
    | "gain-muscle"
    | "improve-health";
  activityLevel: "light" | "moderate" | "intense";
  sex: "man" | "woman";
  age: number;
  height: number;
  weight: number;
  weightGoal: number;
}

export interface UpdatePreferencesData {
  objective?: string;
  activityLevel?: string;
  sex?: string;
  age?: number;
  height?: number;
  weight?: number;
  weightGoal?: number;
}
