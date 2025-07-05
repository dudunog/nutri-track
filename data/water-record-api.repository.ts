import { WaterRecord } from "../domain/water-record";

export interface WaterRecordRepository {
  list(): Promise<WaterRecord[]>;
  create(waterRecord: Omit<WaterRecord, "id">): Promise<WaterRecord>;
}

export class WaterRecordApiRepository implements WaterRecordRepository {
  private baseUrl = "http://192.168.0.140:3001";

  async list(): Promise<WaterRecord[]> {
    try {
      const response = await fetch(`${this.baseUrl}/water-records`);
      if (!response.ok) {
        throw new Error("Erro ao buscar registros de água");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar registros de água:", error);
      throw new Error("Erro ao buscar registros de água");
    }
  }

  async create(waterRecord: Omit<WaterRecord, "id">): Promise<WaterRecord> {
    try {
      const response = await fetch(`${this.baseUrl}/water-records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(waterRecord),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar registro de água");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar registro de água:", error);
      throw new Error("Erro ao criar registro de água");
    }
  }
}
