import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetExpenseFilterDto } from 'src/modules/expense/dto/get-expense-filter.dto';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('total')
  calculateTotalExpenses(
    @Query()
    filter: GetExpenseFilterDto,
  ) {
    return this.calculatorService.calculateTotalExpenses(filter);
  }

  @Get('total/:subscriberId')
  calculateTotalExpensesBySubscriber(
    @Param('subscriberId') subscriberId: string,
    @Query()
    filter: GetExpenseFilterDto,
  ) {
    return this.calculatorService.calculateTotalExpensesBySubscriber(
      subscriberId,
      filter,
    );
  }
}
