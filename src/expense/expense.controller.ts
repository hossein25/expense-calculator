import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseEntity } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses() {
    return await this.expenseService.getAllExpenses();
  }

  @Get(':id')
  async getExpense(@Param('id') id: string) {
    return await this.expenseService.getExpenseById(id);
  }

  @Post()
  async createExpense(@Body() expense: CreateExpenseDto) {
    return await this.expenseService.createExpense(expense);
  }

  @Put(':id')
  async updateExpense(@Body() expense: ExpenseEntity, @Param('id') id: string) {
    return await this.expenseService.updateExpense(id, expense);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    return await this.expenseService.deleteExpense(id);
  }
}
