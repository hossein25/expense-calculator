import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username!: string;

  @Column()
  @Generated('increment')
  referenceCode!: number;

  @AfterInsert()
  addReferenceCode() {
    this.referenceCode = this.referenceCode + 100000;
  }

  @Exclude()
  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  lastLoginAt: Date | null;
}
