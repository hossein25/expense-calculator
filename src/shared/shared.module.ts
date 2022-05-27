import { Global, Module } from '@nestjs/common';
import { TranslationService } from './services/translations.service';

@Global()
@Module({
  providers: [TranslationService],
  exports: [TranslationService],
})
export class SharedModule {}
