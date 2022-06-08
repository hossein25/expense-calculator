import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseEntity } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getAllExpenses(
    @Query()
    filter: GetExpenseFilterDto,
  ) {
    return await this.expenseService.getAllExpenses(filter);
  }

  @Get(':id')
  async getExpense(@Param('id') id: string) {
    return await this.expenseService.getExpenseById(id);
  }

  @Get('subscriber/:id')
  async getExpenseBySubscriber(
    @Param('id') id: string,
    @Query()
    filter: GetExpenseFilterDto,
  ) {
    return await this.expenseService.getExpenseBySubscriber(id, filter);
  }

  @Post()
  async createExpense(@Body() expense: CreateExpenseDto) {
    return await this.expenseService.createExpense(expense);
  }

  @Put(':id')
  async updateExpense(
    @Body() expense: UpdateExpenseDto,
    @Param('id') id: string,
  ) {
    return await this.expenseService.updateExpense(id, expense);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    return await this.expenseService.deleteExpense(id);
  }
}
