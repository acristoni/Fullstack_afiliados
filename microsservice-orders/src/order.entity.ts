import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeEnum } from './enums/type.enum';
import { SignalEnum } from './enums/signal.enum';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TypeEnum })
  type: TypeEnum;

  @Column({ type: 'enum', enum: SignalEnum })
  signal: SignalEnum;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 30 })
  product: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'varchar', length: 20 })
  seller: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
