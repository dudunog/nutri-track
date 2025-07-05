import { User, SignupData } from "../domain/user";
import { UserRepository } from "../data/user-api.repository";

export class SignupUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: SignupData): Promise<User> {
    return await this.userRepository.signup(userData);
  }
}
