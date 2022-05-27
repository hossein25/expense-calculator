import { Injectable } from '@nestjs/common';
import { I18nService, TranslateOptions } from 'nestjs-i18n';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService) {}

  translate(key: string, options: TranslateOptions = {}): string {
    return this.i18n.t(`messages.${key}`, options);
  }
}
