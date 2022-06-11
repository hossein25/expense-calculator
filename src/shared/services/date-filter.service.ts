import { Injectable } from '@nestjs/common';
import { DateFilterEnum } from 'src/common/date-filter.enum';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class DateFilterService {
  createFilter<T>(query: SelectQueryBuilder<T>, dateFilter: DateFilterEnum) {
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

        query
          .andWhere('expense.createdAt >= :after', { after })
          .andWhere('expense.createdAt >= :before', { before });
      }
    }

    return query;
  }
}
