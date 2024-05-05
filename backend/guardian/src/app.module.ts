import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [OpenaiModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
