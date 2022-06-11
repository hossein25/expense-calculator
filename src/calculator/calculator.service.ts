import { Injectable } from '@nestjs/common';
import { Currency } from 'src/common/currency.enum';
import { GetExpenseFilterDto } from 'src/expense/dto/get-expense-filter.dto';
import { ExpenseEntity } from 'src/expense/expense.entity';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class CalculatorService {
  constructor(private readonly expenseService: ExpenseService) {}

  async getAllExpenses(filter: GetExpenseFilterDto) {
    return await this.expenseService.getAllExpenses(filter);
  }

  async calculateTotalExpenses(filter: GetExpenseFilterDto) {
    const expenses = await this.getAllExpenses(filter);
    const total = this.getTotalExpenses(expenses);

    return { total, currency: Currency.IRT };
  }

  async calculateTotalExpensesBySubscriber(
    subscriberId: string,
    filter: GetExpenseFilterDto,
  ) {
    const expenses = await this.expenseService.getExpenseBySubscriber(
      subscriberId,
      filter,
    );
    const total = this.getTotalExpenses(expenses);

    return { total, currency: Currency.IRT };
  }

  getTotalExpenses(expenses: ExpenseEntity[]) {
    return expenses.reduce((acc, expense) => {
      return acc + +expense.price;
    }, 0);
  }
}
