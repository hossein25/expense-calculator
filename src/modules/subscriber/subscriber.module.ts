import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriberEntity])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
