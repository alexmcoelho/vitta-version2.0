import { ObjectID } from 'mongodb';

import ITerritoryRepository from '@modules/territories/repositories/ITerritoryRepository';
import ICreateTerritoryDTO from '@modules/territories/dtos/ICreateTerritoryDTO';
import Territory from '@modules/territories/infra/typeorm/schemas/Territory';

class FakeTerritoryRepository implements ITerritoryRepository {
  save(data: ICreateTerritoryDTO): Promise<Territory> {
    throw new Error('Method not implemented.');
  }

  listAll(): Promise<Territory[]> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Territory | undefined> {
    throw new Error('Method not implemented.');
  }

  private territories: Territory[] = [];

  public async create({ name }: ICreateTerritoryDTO): Promise<Territory> {
    const territory = new Territory();
    Object.assign(territory, { id: new ObjectID(), name });
    this.territories.push(territory);

    return territory;
  }
}

export default FakeTerritoryRepository;
