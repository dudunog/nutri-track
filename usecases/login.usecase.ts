import { User, LoginCredentials } from "../domain/user";
import { UserRepository } from "../data/user-api.repository";

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(credentials: LoginCredentials): Promise<User | null> {
    return await this.userRepository.login(credentials);
  }
}
