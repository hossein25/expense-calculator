import { Injectable } from '@nestjs/common';
import { Currency } from 'src/common/currency.enum';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class CalculatorService {
  constructor(private readonly expenseService: ExpenseService) {}

  async getAllExpenses() {
    return await this.expenseService.getAllExpenses();
  }

  async calculateTotalExpenses() {
    const expenses = await this.getAllExpenses();
    const total = expenses.reduce((acc, expense) => {
      return acc + +expense.price;
    }, 0);

    return { total, currency: Currency.IRT };
  }
}
