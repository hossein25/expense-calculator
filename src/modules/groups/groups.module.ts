import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from './group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
