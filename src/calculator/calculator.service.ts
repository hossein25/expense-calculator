import { Injectable } from '@nestjs/common';
import { Currency } from 'src/common/currency.enum';
import { GetExpenseFilterDto } from 'src/expense/dto/get-expense-filter.dto';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class CalculatorService {
  constructor(private readonly expenseService: ExpenseService) {}

  async getAllExpenses(filter: GetExpenseFilterDto) {
    return await this.expenseService.getAllExpenses(filter);
  }

  async calculateTotalExpenses(filter: GetExpenseFilterDto) {
    const expenses = await this.getAllExpenses(filter);
    const total = expenses.reduce((acc, expense) => {
      return acc + +expense.price;
    }, 0);

    return { total, currency: Currency.IRT };
  }
}
