import { Controller, Get } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('total')
  calculateTotalExpenses() {
    return this.calculatorService.calculateTotalExpenses();
  }
}
