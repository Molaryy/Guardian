import { Module } from '@nestjs/common';
import {AppController} from "../app.controller";
import {OpenaiController} from "./openai.controller";
import {AppService} from "../app.service";
import {OpenaiService} from "./openai.service";

@Module({
    imports: [OpenaiModule],
    controllers: [OpenaiController],
    providers: [OpenaiService],
})
export class OpenaiModule {}
