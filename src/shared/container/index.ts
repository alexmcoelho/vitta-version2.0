import { container } from 'tsyringe';

import ITerritoryRepository from '@modules/territories/repositories/ITerritoryRepository';
import TerritoryRepository from '@modules/territories/infra/typeorm/repositories/TerritoryRepository';

container.registerSingleton<ITerritoryRepository>(
  'TerritoryRepository',
  TerritoryRepository,
);
