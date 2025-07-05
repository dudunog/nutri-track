import { Food } from "../domain/food";
import { FoodApiRepository } from "../data/food-api.repository";

export class ListFoodsUseCase {
  constructor(private foodRepo = new FoodApiRepository()) {}

  async execute(): Promise<Food[]> {
    return this.foodRepo.getAll();
  }
}
