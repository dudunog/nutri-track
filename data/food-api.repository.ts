import { Food } from "../domain/food";

const API_URL = "http://192.168.0.140:3001/foods";

export class FoodApiRepository {
  async getAll(): Promise<Food[]> {
    const res = await fetch(API_URL);
    console.log("res", res);
    if (!res.ok) throw new Error("Erro ao buscar alimentos");
    return res.json();
  }

  async create(food: Omit<Food, "id">): Promise<Food> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
    });
    if (!res.ok) throw new Error("Erro ao criar alimento");
    return res.json();
  }

  async update(id: number, food: Partial<Food>): Promise<Food> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
    });
    if (!res.ok) throw new Error("Erro ao atualizar alimento");
    return res.json();
  }
}
