import { getMongoRepository, MongoRepository } from 'typeorm';

import ITerritoryRepository from '@modules/territories/repositories/ITerritoryRepository';
import Territory from '@modules/territories/infra/typeorm/schemas/Territory';
import ICreateTerritoryDTO from '@modules/territories/dtos/ICreateTerritoryDTO';
import { ObjectId } from 'mongodb';

class TerritoryRepository implements ITerritoryRepository {
  private ormRepository: MongoRepository<Territory>;

  constructor() {
    this.ormRepository = getMongoRepository(Territory, 'mongo');
  }

  public async save({
    name,
    start,
    end,
  }: ICreateTerritoryDTO): Promise<Territory> {
    const territory = this.ormRepository.create({
      name,
      start,
      end,
    });
    await this.ormRepository.save(territory);
    return territory;
  }

  public async listAll(): Promise<Territory[]> {
    const territories = await this.ormRepository.find();
    return territories;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.deleteOne({ _id: new ObjectId(id) });
  }

  public async findById(id: string): Promise<Territory | undefined> {
    const territory = await this.ormRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });
    return territory;
  }
}

export default TerritoryRepository;
