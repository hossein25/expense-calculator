import { NotFoundException } from '@nestjs/common';
import { TranslationService } from 'src/shared/services/translations.service';

export class SubscriberNotFoundException extends NotFoundException {
  constructor(translationService: TranslationService, error?: string) {
    super(translationService.translate('subscriber.error.notFound'), error);
  }
}
