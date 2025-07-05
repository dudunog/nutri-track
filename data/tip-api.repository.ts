import { Tip } from "../domain/tip";

const API_URL = "http://192.168.0.140:3001/tips";

export class TipApiRepository {
  async getAll(): Promise<Tip[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar dicas");
    return res.json();
  }
}
