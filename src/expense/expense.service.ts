import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async getAllExpenses() {
    return await this.expenseRepository.find();
  }

  async getExpenseById(id: string) {
    const expense = await this.expenseRepository.findOne(id);
    if (!expense) {
      throw new NotFoundException('Expense not found').getResponse();
    }
    return expense;
  }

  async createExpense(expense: ExpenseEntity) {
    return await this.expenseRepository.save(expense);
  }

  async updateExpense(id: string, expense: ExpenseEntity) {
    return await this.expenseRepository.update(id, expense).then((res) => {
      if (res.affected === 0) {
        throw new NotFoundException('Expense not found').getResponse();
      }
      return res;
    });
  }

  async deleteExpense(id: string) {
    return await this.expenseRepository.delete(id).then((res) => {
      if (res.affected === 0) {
        throw new NotFoundException('Expense not found').getResponse();
      }
      return res;
    });
  }
}
