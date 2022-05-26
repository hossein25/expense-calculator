import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
