import { Meal } from "../domain/meal";
import { MealRepository } from "../data/meal-api.repository";

export class ListMealsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(): Promise<Meal[]> {
    return await this.mealRepository.getAll();
  }
}
