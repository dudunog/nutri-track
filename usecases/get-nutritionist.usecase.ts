import { Nutritionist } from "../domain/nutritionist";
import { NutritionistRepository } from "../data/nutritionist-api.repository";

export class GetNutritionistUseCase {
  constructor(private nutritionistRepository: NutritionistRepository) {}

  async executeByUserId(userId: number): Promise<Nutritionist | null> {
    return await this.nutritionistRepository.getByUserId(userId);
  }

  async executeById(id: number): Promise<Nutritionist | null> {
    return await this.nutritionistRepository.getById(id);
  }
}
