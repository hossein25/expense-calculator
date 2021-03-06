import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorModule } from './modules/calculator/calculator.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { SubscriberModule } from './modules/subscriber/subscriber.module';
import { UserModule } from './modules/user/user.module';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ExpenseModule,
    SubscriberModule,
    CalculatorModule,
    SharedModule,
    UserModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
