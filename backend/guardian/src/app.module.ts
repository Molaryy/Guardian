import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';

@Module({
  imports: [OpenaiModule, DbModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
