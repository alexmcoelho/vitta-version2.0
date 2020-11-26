import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import Coordinate from './Coordinate';

@Entity('territory')
class Territory {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column(_ => Coordinate)
  start: Coordinate;

  @Column(_ => Coordinate)
  end: Coordinate;

  @Column(_ => Coordinate)
  paintedSquares: Coordinate[];

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}

export default Territory;
