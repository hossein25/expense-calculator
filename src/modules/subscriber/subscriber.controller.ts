import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberService } from './subscriber.service';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberService.createSubscriber(createSubscriberDto);
  }

  @Get()
  findAll() {
    return this.subscriberService.getAllSubscribers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriberService.getSubscriberById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    return this.subscriberService.updateSubscriber(id, updateSubscriberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriberService.removeSubscriber(id);
  }
}
