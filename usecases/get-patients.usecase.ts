import { User } from "../domain/user";
import { UserRepository } from "../data/user-api.repository";

export class GetPatientsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(nutritionistId: number): Promise<User[]> {
    return await this.userRepository.getPatientsByNutritionistId(
      nutritionistId
    );
  }
}
