import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITerritoryRepository from '@modules/territories/repositories/ITerritoryRepository';
import { ObjectId } from 'mongodb';

interface ICoordinateRequest {
  x: number;
  y: number;
}

interface IRequest {
  name: string;
  start: ICoordinateRequest;
  end: ICoordinateRequest;
}

interface IResponse {
  id: ObjectId;
  name: string;
  start: ICoordinateRequest;
  end: ICoordinateRequest;
  area: number;
  paintedArea: number;
}

@injectable()
class TerritoryService {
  private territoryRepository: ITerritoryRepository;

  constructor(
    @inject('TerritoryRepository')
    territoryRepository: ITerritoryRepository,
  ) {
    this.territoryRepository = territoryRepository;
  }

  public async save({ name, start, end }: IRequest): Promise<IResponse> {
    const territories = await this.territoryRepository.listAll();

    const filterTerritories = territories.filter(t =>
      this.available(
        t.start.x,
        t.start.y,
        t.end.x,
        t.end.y,
        start.x,
        start.y,
        end.x,
        end.y,
      ),
    );

    if (filterTerritories.length > 0) {
      throw new AppError('This new territory overlaps with another territory.');
    }

    const territory = await this.territoryRepository.save({
      name,
      start,
      end,
    });

    const data = {
      id: territory.id,
      name: territory.name,
      start: territory.start,
      end: territory.end,
      area: (end.x - start.x) * (end.y - start.y),
      paintedArea: 0,
    };

    return data;
  }

  public available(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number,
  ): boolean {
    const checkInternalPointStart =
      (x2 - x1) * (yStart - y1) - (xStart - x1) * (y2 - y1);

    const checkInternalPointEnd =
      (x2 - x1) * (yEnd - y1) - (xEnd - x1) * (y2 - y1);

    const checkExternalPoints = xStart <= y2 && yEnd <= y2;

    return (
      checkInternalPointStart !== 0 ||
      checkInternalPointEnd !== 0 ||
      checkExternalPoints
    );
  }

  public async listAll(): Promise<IResponse[]> {
    const territories = this.territoryRepository.listAll();
    const listResponse: IResponse[] = [];
    let newTerritory: IResponse;
    (await territories).forEach(territory => {
      newTerritory = {
        id: territory.id,
        name: territory.name,
        start: territory.start,
        end: territory.end,
        area:
          (territory.end.x - territory.start.x) *
          (territory.end.y - territory.start.y),
        paintedArea: territory.paintedSquares
          ? territory.paintedSquares.length
          : 0,
      };
      listResponse.push(newTerritory);
    });
    return listResponse;
  }

  public async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new AppError('This ID is invalide.');
    }

    const territory = await this.territoryRepository.findById(id);
    if (!territory) {
      throw new AppError('This territory was not found.', 404);
    }
    this.territoryRepository.delete(id);
  }
}

export default TerritoryService;
