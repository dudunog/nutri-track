import { Nutritionist } from "../domain/nutritionist";

export interface NutritionistRepository {
  getByUserId(userId: number): Promise<Nutritionist | null>;
  getById(id: number): Promise<Nutritionist | null>;
}

export class NutritionistApiRepository implements NutritionistRepository {
  private baseUrl = "http://192.168.0.140:3001";

  async getByUserId(userId: number): Promise<Nutritionist | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/nutritionists?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar nutricionista");
      }
      const nutritionists = await response.json();
      return nutritionists.length > 0 ? nutritionists[0] : null;
    } catch (error) {
      console.error("Erro ao buscar nutricionista:", error);
      throw new Error("Erro ao buscar nutricionista");
    }
  }

  async getById(id: number): Promise<Nutritionist | null> {
    try {
      const response = await fetch(`${this.baseUrl}/nutritionists/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar nutricionista");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar nutricionista:", error);
      throw new Error("Erro ao buscar nutricionista");
    }
  }
}
