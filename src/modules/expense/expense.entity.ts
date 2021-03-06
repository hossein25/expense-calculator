import { SubscriberEntity } from 'src/modules/subscriber/subscriber.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupsEntity } from '../groups/group.entity';

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => SubscriberEntity)
  @JoinColumn()
  payer: SubscriberEntity;

  @ManyToOne(() => GroupsEntity)
  @JoinColumn()
  group: GroupsEntity;

  @Column()
  price: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
