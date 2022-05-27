import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from 'src/subscriber/subscriber.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseEntity } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async getAllExpenses() {
    return await this.expenseRepository.find({
      relations: ['payer'],
    });
  }

  async getExpenseById(id: string) {
    const expense = await this.expenseRepository.findOne(id, {
      relations: ['payer'],
    });
    if (!expense) {
      throw new NotFoundException('Expense not found').getResponse();
    }
    return expense;
  }

  async getExpenseBySubscriber(subscriberId: string) {
    const expenses = await this.expenseRepository.find({
      where: { payer: subscriberId },
      relations: ['payer'],
    });
    if (!expenses) {
      throw new NotFoundException('Expense not found').getResponse();
    }
    return expenses;
  }

  async createExpense(expense: CreateExpenseDto) {
    const payer = await this.subscriberRepository.findOne({
      where: { id: expense.payerId },
    });

    const newExpense = this._createExpense(expense, payer);
    return await this.expenseRepository.save(newExpense);
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

  _createExpense(expense: CreateExpenseDto, payer: SubscriberEntity) {
    const newExpense = new ExpenseEntity();
    newExpense.title = expense.title;
    newExpense.description = expense.description;
    newExpense.price = expense.price;
    newExpense.payer = payer;

    return newExpense;
  }
}
