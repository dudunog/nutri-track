import { Meal } from "../domain/meal";

export interface MealRepository {
  getAll(): Promise<Meal[]>;
  create(meal: Omit<Meal, "id">): Promise<Meal>;
}

export class MealApiRepository implements MealRepository {
  private baseUrl = "http://192.168.0.140:3001";

  async getAll(): Promise<Meal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/meals`);
      if (!response.ok) {
        throw new Error("Erro ao buscar refeições");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
      throw new Error("Erro ao buscar refeições");
    }
  }

  async create(meal: Omit<Meal, "id">): Promise<Meal> {
    try {
      const response = await fetch(`${this.baseUrl}/meals`, {
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
