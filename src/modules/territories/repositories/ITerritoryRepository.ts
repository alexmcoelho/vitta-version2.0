import ICreateTerritoryDTO from '../dtos/ICreateTerritoryDTO';
import Territory from '../infra/typeorm/schemas/Territory';

export default interface ITerritoryRepository {
  save(data: ICreateTerritoryDTO): Promise<Territory>;
  listAll(): Promise<Territory[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Territory | undefined>;
}
