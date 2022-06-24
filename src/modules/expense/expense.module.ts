import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';
import { SubscriberEntity } from 'src/modules/subscriber/subscriber.entity';
import { GroupsEntity } from '../groups/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseEntity, SubscriberEntity, GroupsEntity]),
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController],
  exports: [ExpenseService],
})
export class ExpenseModule {}
