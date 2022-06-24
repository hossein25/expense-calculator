import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscriber')
export class SubscriberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
