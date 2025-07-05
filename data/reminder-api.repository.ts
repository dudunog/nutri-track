import { Reminder } from "../domain/reminder";

const API_URL = "http://192.168.0.140:3001/reminders";

export class ReminderApiRepository {
  async getAll(): Promise<Reminder[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar lembretes");
    return res.json();
  }
}
