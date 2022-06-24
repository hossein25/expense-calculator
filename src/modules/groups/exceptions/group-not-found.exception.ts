import { NotFoundException } from '@nestjs/common';
import { TranslationService } from 'src/shared/services/translations.service';

export class GroupNotFoundException extends NotFoundException {
  constructor(translationService: TranslationService, error?: string) {
    super(translationService.translate('group.error.notFound'), error);
  }
}
