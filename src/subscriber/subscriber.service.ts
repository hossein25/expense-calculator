import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async createSubscriber(createSubscriberDto: CreateSubscriberDto) {
    return await this.subscriberRepository.save(createSubscriberDto);
  }

  async getAllSubscribers() {
    return await this.subscriberRepository.find();
  }

  async getSubscriberById(id: number) {
    const expense = await this.subscriberRepository.findOne(id);
    if (!expense) {
      throw new NotFoundException('Subscriber not found').getResponse();
    }
    return expense;
  }

  async updateSubscriber(id: string, updateSubscriberDto: UpdateSubscriberDto) {
    return await this.subscriberRepository
      .update(id, updateSubscriberDto)
      .then((res) => {
        if (res.affected === 0) {
          throw new NotFoundException('Subscriber not found').getResponse();
        }
        return res;
      });
  }

  async removeSubscriber(id: number) {
    return await this.subscriberRepository.delete(id).then((res) => {
      if (res.affected === 0) {
        throw new NotFoundException('Subscriber not found').getResponse();
      }
      return res;
    });
  }
}
