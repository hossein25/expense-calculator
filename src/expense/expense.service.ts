import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateFilterEnum } from 'src/common/date-filter.enum';
import { Order } from 'src/common/order.enum';
import { SubscriberEntity } from 'src/subscriber/subscriber.entity';
import { Between, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseEntity } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async getAllExpenses(filter: GetExpenseFilterDto) {
    const { dateFilter, order } = filter;

    const query = this.expenseRepository.createQueryBuilder('expense');

    this.createExpensesDateFilter(query, dateFilter);

    query.leftJoinAndSelect('expense.payer', 'payer');

    this.createExpensesOrderFilter(query, order);
    return await query.getMany();
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

  async getExpenseBySubscriber(
    subscriberId: string,
    filter: GetExpenseFilterDto,
  ) {
    const { dateFilter, order } = filter;

    const query = this.expenseRepository
      .createQueryBuilder('expense')
      .andWhere('expense.payer = :subscriberId', {
        subscriberId,
      });

    this.createExpensesDateFilter(query, dateFilter);

    query.leftJoinAndSelect('expense.payer', 'payer');

    this.createExpensesOrderFilter(query, order);
    return await query.getMany();
  }

  createExpensesDateFilter(
    query: SelectQueryBuilder<ExpenseEntity>,
    dateFilter: DateFilterEnum,
  ) {
    if (dateFilter) {
      if (dateFilter === DateFilterEnum.CURRENT_MONTH) {
        const createdAt = new Date();
        createdAt.setDate(1);
        createdAt.setHours(0, 0, 0, 0);
        query.andWhere('expense.createdAt >= :createdAt', { createdAt });
      } else if (dateFilter === DateFilterEnum.LAST_MONTH) {
        const after = new Date();
        after.setDate(1);
        after.setHours(0, 0, 0, 0);

        const before = new Date();
        before.setDate(1);
        before.setHours(0, 0, 0, 0);

        if (after.getMonth() > 1) {
          after.setMonth(after.getMonth() - 1);
        } else {
          after.setMonth(12);
          after.setFullYear(after.getFullYear() - 1);
        }
        query.where({ createdAt: Between(after, before) });
      }
    }

    return query;
  }

  createExpensesOrderFilter(
    query: SelectQueryBuilder<ExpenseEntity>,
    order: Order,
  ) {
    if (order) {
      query.orderBy('created_at', order);
    }
    return query;
  }

  async createExpense(expense: CreateExpenseDto) {
    const payer = await this.subscriberRepository.findOne({
      where: { id: expense.payerId },
    });

    const newExpense = this._createExpense(expense, payer);
    return await this.expenseRepository.save(newExpense);
  }

  async updateExpense(id: string, expense: UpdateExpenseDto) {
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
