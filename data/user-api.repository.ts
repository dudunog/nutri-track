import { User, LoginCredentials, SignupData } from "../domain/user";

export interface UserRepository {
  login(credentials: LoginCredentials): Promise<User | null>;
  signup(userData: SignupData): Promise<User>;
  getById(id: number): Promise<User | null>;
  getPatientsByNutritionistId(nutritionistId: number): Promise<User[]>;
}

export class UserApiRepository implements UserRepository {
  private baseUrl = "http://192.168.0.140:3001";

  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users?email=${credentials.email}`
      );
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const users = await response.json();
      const user = users.find(
        (u: User) =>
          u.email === credentials.email && u.password === credentials.password
      );

      return user || null;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Erro ao fazer login");
    }
  }

  async signup(userData: SignupData): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw new Error("Erro ao criar conta");
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw new Error("Erro ao buscar usuário");
    }
  }

  async getPatientsByNutritionistId(nutritionistId: number): Promise<User[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users?nutritionistId=${nutritionistId}&type=patient`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar pacientes");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      throw new Error("Erro ao buscar pacientes");
    }
  }
}
