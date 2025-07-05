import { Nutritionist, UpdateNutritionistData } from "../domain/nutritionist";
import { NutritionistRepository } from "../data/nutritionist-api.repository";

export class UpdateNutritionistUseCase {
  constructor(private nutritionistRepository: NutritionistRepository) {}

  async execute(
    id: number,
    data: UpdateNutritionistData
  ): Promise<Nutritionist> {
    return await this.nutritionistRepository.update(id, data);
  }
}
