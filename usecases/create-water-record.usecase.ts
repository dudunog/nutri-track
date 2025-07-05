import { WaterRecord } from "../domain/water-record";
import { WaterRecordRepository } from "../data/water-record-api.repository";

export class CreateWaterRecordUseCase {
  constructor(private waterRecordRepository: WaterRecordRepository) {}

  async execute(waterRecord: Omit<WaterRecord, "id">): Promise<WaterRecord> {
    return await this.waterRecordRepository.create(waterRecord);
  }
}
