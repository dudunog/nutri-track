import { User } from "../domain/user";
import { UpdatePreferencesData } from "../domain/user-preferences";
import { UserRepository } from "../data/user-api.repository";

export class UpdatePreferencesUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    userId: number,
    preferences: UpdatePreferencesData
  ): Promise<User> {
    return await this.userRepository.updatePreferences(userId, preferences);
  }
}
