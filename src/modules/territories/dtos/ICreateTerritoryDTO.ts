import ICoordinateDTO from './ICoordinateDTO';

export default interface ICreateTerritoryDTO {
  name: string;
  start: ICoordinateDTO;
  end: ICoordinateDTO;
}
