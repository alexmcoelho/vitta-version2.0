import { Column } from 'typeorm';

class Coordinate {
  @Column('decimal')
  x: number;

  @Column('decimal')
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Coordinate;
