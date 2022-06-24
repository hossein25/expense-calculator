import { Module } from '@nestjs/common';
import { ExpenseModule } from 'src/modules/expense/expense.module';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

@Module({
  imports: [ExpenseModule],
  providers: [CalculatorService],
  controllers: [CalculatorController],
})
export class CalculatorModule {}
