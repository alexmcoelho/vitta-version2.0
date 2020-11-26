import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TerritoryService from '@modules/territories/services/TerritoryService';

export default class TerritoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { start, end } = request.body;

    const territoryService = container.resolve(TerritoryService);

    const territory = await territoryService.save({
      name,
      start,
      end,
    });

    return response.json(territory);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const territoryService = container.resolve(TerritoryService);

    const territories = await territoryService.listAll();

    return response.json({ count: territories.length, data: territories });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const territoryService = container.resolve(TerritoryService);

    await territoryService.delete(id);

    return response.json({ error: false });
  }
}
