import { Global, Module } from '@nestjs/common';
import { DateFilterService } from './services/date-filter.service';
import { TranslationService } from './services/translations.service';

@Global()
@Module({
  providers: [TranslationService, DateFilterService],
  exports: [TranslationService, DateFilterService],
})
export class SharedModule {}
