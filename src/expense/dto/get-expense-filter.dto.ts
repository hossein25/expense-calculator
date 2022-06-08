import { IsIn, IsOptional } from 'class-validator';
import { DateFilterEnum } from 'src/common/date-filter.enum';
import { Order } from 'src/common/order.enum';

export class GetExpenseFilterDto {
  @IsOptional()
  @IsIn(
    [
      DateFilterEnum.ALL,
      DateFilterEnum.CURRENT_MONTH,
      DateFilterEnum.LAST_MONTH,
    ],
    {
      message: `valid dateFilter is one of these: ${[
        DateFilterEnum.ALL,
        DateFilterEnum.CURRENT_MONTH,
        DateFilterEnum.LAST_MONTH,
      ]}`,
    },
  )
  dateFilter: DateFilterEnum;

  @IsOptional()
  @IsIn([Order.DESC, Order.ASC], {
    message: `valid order is one of these: ${[Order.DESC, Order.ASC]}`,
  })
  order: Order;
}
