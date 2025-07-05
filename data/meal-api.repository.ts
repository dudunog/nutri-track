import { Meal } from "../domain/meal";

const API_URL = "http://192.168.0.140:3001/meals";

export interface MealRepository {
  getAll(): Promise<Meal[]>;
  create(meal: Omit<Meal, "id">): Promise<Meal>;
}

export class MealApiRepository implements MealRepository {
  async getAll(): Promise<Meal[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar refeições");
    return res.json();
  }

  async create(meal: Omit<Meal, "id">): Promise<Meal> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meal),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar refeição");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar refeição:", error);
      throw new Error("Erro ao criar refeição");
    }
  }
}
