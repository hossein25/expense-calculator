import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslationService } from 'src/shared/services/translations.service';
import { Repository } from 'typeorm';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { SubscriberNotFoundException } from './exceptions/subscriber-not-found.exception';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
    private readonly translationService: TranslationService,
  ) {}

  async createSubscriber(createSubscriberDto: CreateSubscriberDto) {
    return await this.subscriberRepository.save(createSubscriberDto);
  }

  async getAllSubscribers() {
    return await this.subscriberRepository.find();
  }

  async getSubscriberById(id: string) {
    const expense = await this.subscriberRepository.findOne(id);
    if (!expense) {
      throw this.getLocalizedNotFoundException();
    }
    return expense;
  }

  async updateSubscriber(id: string, updateSubscriberDto: UpdateSubscriberDto) {
    return await this.subscriberRepository
      .update(id, updateSubscriberDto)
      .then((res) => {
        if (res.affected === 0) {
          throw this.getLocalizedNotFoundException();
        }
        return res;
      });
  }

  async removeSubscriber(id: string) {
    return await this.subscriberRepository.delete(id).then((res) => {
      if (res.affected === 0) {
        throw this.getLocalizedNotFoundException();
      }
      return res;
    });
  }

  getLocalizedNotFoundException() {
    const exception = new SubscriberNotFoundException(this.translationService);
    return exception.getResponse();
  }
}
