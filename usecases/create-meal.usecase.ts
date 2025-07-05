import { Meal } from "../domain/meal";
import { MealRepository } from "../data/meal-api.repository";

export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute(meal: Omit<Meal, "id">): Promise<Meal> {
    return await this.mealRepository.create(meal);
  }
}
