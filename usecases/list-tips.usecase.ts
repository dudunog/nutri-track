import { Tip } from "../domain/tip";
import { TipApiRepository } from "../data/tip-api.repository";

export class ListTipsUseCase {
  constructor(private tipRepo = new TipApiRepository()) {}

  async execute(): Promise<Tip[]> {
    return this.tipRepo.getAll();
  }
}
