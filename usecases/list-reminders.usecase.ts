import { Reminder } from "../domain/reminder";
import { ReminderApiRepository } from "../data/reminder-api.repository";

export class ListRemindersUseCase {
  constructor(private reminderRepo = new ReminderApiRepository()) {}

  async execute(): Promise<Reminder[]> {
    return this.reminderRepo.getAll();
  }
}
