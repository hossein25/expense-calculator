import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/common/order.enum';
import { DateFilterService } from 'src/shared/services/date-filter.service';
import { TranslationService } from 'src/shared/services/translations.service';
import { SubscriberNotFoundException } from 'src/modules/subscriber/exceptions/subscriber-not-found.exception';
import { SubscriberEntity } from 'src/modules/subscriber/subscriber.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
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
    private readonly dateFilterService: DateFilterService,
    private readonly translationService: TranslationService,
  ) {}

  async getAllExpenses(filter: GetExpenseFilterDto) {
    const { dateFilter, order } = filter;

    const query = this.expenseRepository.createQueryBuilder('expense');

    this.dateFilterService.createFilter(query, dateFilter);

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

    this.dateFilterService.createFilter(query, dateFilter);

    query.leftJoinAndSelect('expense.payer', 'payer');

    this.createExpensesOrderFilter(query, order);
    return await query.getMany();
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

    if (!payer) {
      throw this.getLocalizedNotFoundException();
    }

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

  async deleteAllSubscriberExpenses(subscriberId: string) {
    const payer = await this.subscriberRepository.findOne({
      where: { id: subscriberId },
    });

    if (!payer) {
      throw this.getLocalizedNotFoundException();
    }

    return await this.expenseRepository.delete({
      payer: { id: subscriberId },
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

  getLocalizedNotFoundException() {
    const exception = new SubscriberNotFoundException(this.translationService);
    return exception.getResponse();
  }
}
